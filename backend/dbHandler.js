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
 * Plus a 'status' of either, 'rejected', 'approved', or 'sent' (no status when first submitted)
 * 
 */
var Cloudant = require('@cloudant/cloudant');
var sanitizeHtml = require('sanitize-html');

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
        }.toString(),
        reduce: '_sum'
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
        }.toString(),
        reduce: '_sum'
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
        }.toString(),
        reduce: '_sum'
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
        }.toString(),
        reduce: '_sum'
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
        }.toString(),
        reduce: '_sum'
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

        if(!(newStatus === 'approved' || newStatus === 'rejected' || newStatus === 'sent')) {
          return [null, {code: 400, body: 'Invalid status'}];
        } else if(doc.status && doc.status === newStatus) {
          return [null, 'Status update not required'];
        }

        doc.status = newStatus;
        return [doc, 'Status updated'];
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

exports.createDb = createDb;
exports.submitPostcard = submitPostcard;
