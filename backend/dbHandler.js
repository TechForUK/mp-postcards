'use strict';
/*
 * Postcards should contain the following content:
 *  - subject
 *  - image
 *  - mpEmail
 *  - message
 *  - name
 *  - email
 *  - address
 *  - date
 * 
 * Plus a 'status' of either, 'rejected', 'approved', 'duplicate', or 'sent' (no status when first submitted)
 * 
 */
const Cloudant = require('@cloudant/cloudant');
const sanitizeHtml = require('sanitize-html');
const sgMail = require('@sendgrid/mail');

const sanitizeOptions = {
  allowedTags: [],
  allowedAttributes: []
}

const validImages = [
  'abacus-1866497_1920.jpg',
  'cctv-1144366_1920.jpg',
  'cry-stone-walls-2451428_1920.jpg',
  'london-90782_1920.jpg',
  'pencil-918449_1920.jpg',
  'supermarket-2158692_1920.jpg',
  'surgery-1807541_1920.jpg',
  'welder-673559_1920.jpg'
];

async function createDb(params) {
  const url = params.dbUrl;
  const dbName = params.dbName || 'postcards';
  const cloudant = Cloudant({ url, plugins: 'promises' });

  const status = ['Creating database: ' + dbName];

  try {
    await cloudant.db.create(dbName);
  } catch (err) {
    status.push('Failed to create database: ' + err);
  }

  const postcardDb = cloudant.db.use(dbName);

  status.push('Creating mp view...');

  const mpView = {
    _id: '_design/mp_view',
    views: {
      mp_view: {
        map: function (doc) {
          if (doc.mpEmail) {
            emit(doc.mpEmail, null);
          }
        }.toString()
      }
    }
  };

  try {
    await postcardDb.insert(mpView);
  } catch (err) {
    status.push('Failed to create mp view: ' + err);
  }

  status.push('Creating constituent view...');

  const constituentView = {
    _id: '_design/constituent_view',
    views: {
      constituent_view: {
        map: function (doc) {
          if (doc.email) {
            emit(doc.email, null);
          }
        }.toString()
      }
    }
  };

  try {
    await postcardDb.insert(constituentView);
  } catch (err) {
    status.push('Failed to create constituent view: ' + err);
  }

  status.push('Creating pending view...');

  const pendingView = {
    _id: '_design/pending_view',
    views: {
      pending_view: {
        map: function (doc) {
          if (!doc.status) {
            emit(doc.date, null);
          }
        }.toString()
      }
    }
  };

  try {
    await postcardDb.insert(pendingView);
  } catch (err) {
    status.push('Failed to create pending view: ' + err);
  }

  status.push('Creating approved view...');

  const approvedView = {
    _id: '_design/approved_view',
    views: {
      approved_view: {
        map: function (doc) {
          if (doc.status === 'approved') {
            emit(doc.date, null);
          }
        }.toString()
      }
    }
  };

  try {
    await postcardDb.insert(approvedView);
  } catch (err) {
    status.push('Failed to create approved view: ' + err);
  }

  status.push('Creating sent view...');

  const sentView = {
    _id: '_design/sent_view',
    views: {
      sent_view: {
        map: function (doc) {
          if (doc.status === 'sent') {
            emit(doc.date, null);
          }
        }.toString()
      }
    }
  };

  try {
    await postcardDb.insert(sentView);
  } catch (err) {
    status.push('Failed to create sent view: ' + err);
  }

  status.push('Creating update functions...');

  const updateFunctions = {
    _id: '_design/update_functions',
    updates: {
      update_status: function (doc, req) {
        const reqBody = JSON.parse(req.body);
        const newStatus = reqBody.status;

        if(!(newStatus === 'approved' || newStatus === 'rejected' || newStatus === 'duplicate' || newStatus === 'sent')) {
          return [null, {code: 400, body: 'Invalid status'}];
        } else if(doc.status && doc.status === newStatus) {
          return [null, 'Status update not required'];
        } else if(newStatus === 'sent' && doc.status && doc.status !== 'approved') {
          return [null, {code: 400, body: 'Not approved for sending'}];
        } else if(doc.status && doc.status === 'sent') {
          return [null, {code: 400, body: 'Cannot change status'}];
        }

        doc.status = newStatus;
        return [doc, {json: {postcard: doc}}];
      }.toString(),
    }
  };

  try {
    await postcardDb.insert(updateFunctions);
  } catch (err) {
    status.push('Failed to create update functions: ' + err);
  }

  return { status };
}

async function submitPostcard(params) {
  if(!(
        params.subject &&
        params.image &&
        params.mpEmail &&
        params.message &&
        params.name &&
        params.email &&
        params.address
      ) ||
      (params.message.length + params.name.length + params.address.length) > 450 ||
      !validImages.includes(params.image)
    ) {
    return { error: 'Invalid postcard' };
  }

  const url = params.dbUrl;
  const dbName = params.dbName || 'postcards';
  const cloudant = Cloudant({ url, plugins: 'promises' });
  const postcardDb = cloudant.db.use(dbName);

  const status = ['Creating postcard: ' + dbName];

  const subject = sanitizeHtml(params.subject, sanitizeOptions);
  const image = params.image;
  const mpEmail = sanitizeHtml(params.mpEmail, sanitizeOptions);
  const message = sanitizeHtml(params.message, sanitizeOptions);
  const name = sanitizeHtml(params.name, sanitizeOptions);
  const email = sanitizeHtml(params.email, sanitizeOptions);
  const address = sanitizeHtml(params.address, sanitizeOptions);
  const now = new Date().getTime();
  const date = new Date(now).toISOString();

  const postcard = {
    subject,
    image,
    mpEmail,
    message,
    name,
    email,
    address,
    date
  }

  try {
    const id = '';
    await postcardDb.insert(postcard, id);
  } catch (err) {
    return { error: 'Failed to create postcard: ' + err };
  }

  return { status, postcard };
}

async function sendPostcards(params) {
  const url = params.dbUrl;
  const dbName = params.dbName || 'postcards';
  const sendgridApiKey = params.sendgridApiKey;
  const sendgridTemplateId = params.sendgridTemplateId;
  const sendgridEmail = params.sendgridEmail;

  const status = ['Fetching postcards: ' + dbName];

  const cloudant = Cloudant({ url, plugins: 'promises' });
  const postcardDb = cloudant.db.use(dbName);

  try {
    const searchResult = await postcardDb.view('approved_view', 'approved_view', {include_docs: false});
  
    if (searchResult.total_rows && searchResult.rows) {
      status.push('Postcards to send: ' + searchResult.total_rows);

      sgMail.setApiKey(sendgridApiKey);
      for (var i = 0; i < searchResult.rows.length; i++) {
        const postcardId = searchResult.rows[i].id;

        const sendStatus = await sendPostcard(postcardDb, postcardId, sendgridTemplateId, sendgridEmail);
        Array.prototype.push.apply(status, sendStatus);
      }
    }
  } catch (err) {
    status.push('Failed to send postcards: ' + err);
  }

  return { status };
}

exports.createDb = createDb;
exports.submitPostcard = submitPostcard;
exports.sendPostcards = sendPostcards;

async function sendPostcard(postcardDb, postcardId, sendgridTemplateId, sendgridEmail) {
  const status = [];

  try {
    const updateResult = await postcardDb.atomic('update_functions', 'update_status', postcardId, {status: 'sent'});
    if (!updateResult.postcard) {
      status.push('Could not update postcard for sending: ' + JSON.stringify(updateResult));
    } else {
      const postcard = updateResult.postcard;
      status.push('Sending postcard: ' + postcardId);

      const msg = {
        to: postcard.mpEmail,
        from: sendgridEmail,
        subject: postcard.subject,
        templateId: sendgridTemplateId,
        dynamic_template_data: {
          subject: postcard.subject,
          image: postcard.image,
          mpEmail: postcard.mpEmail,
          message: postcard.message,
          name: postcard.name,
          email: postcard.email,
          address: postcard.address
        },
      };
      sgMail.send(msg);
  
      status.push('Postcard sent');
    }
  } catch (err) {
    status.push('Failed to send postcard: ' + err);
  }

  return status;
}
