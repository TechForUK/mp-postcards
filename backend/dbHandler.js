'use strict';
/*
 * Postcards should contain the following content:
 *  - subject
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
            emit(doc.mpEmail,doc);
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
            emit(doc.email,doc);
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
            emit(doc.date,doc);
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
            emit(doc.date,doc);
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
            emit(doc.date,doc);
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

  return { status };
}

async function submitPostcard(params) {
  if(!(params.subject &&
       params.mpEmail &&
       params.message &&
       params.name &&
       params.email &&
       params.address)) {
    return { error: 'Invalid postcard' };
  }

  const url = params.dbUrl;
  const dbName = params.dbName || 'postcards';
  const cloudant = Cloudant({ url, plugins: 'promises' });
  const postcardDb = cloudant.db.use(dbName);

  const status = ['Creating postcard: ' + dbName];

  const subject = sanitizeHtml(params.subject, sanitizeOptions);
  const mpEmail = sanitizeHtml(params.mpEmail, sanitizeOptions);
  const message = sanitizeHtml(params.message, sanitizeOptions);
  const name = sanitizeHtml(params.name, sanitizeOptions);
  const email = sanitizeHtml(params.email, sanitizeOptions);
  const address = sanitizeHtml(params.address, sanitizeOptions);
  const now = new Date().getTime();
  const date = new Date(now).toISOString();

  const postcard = {
    subject,
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
