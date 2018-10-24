'use strict';

var PostcodesIO = require('postcodesio-client');
var postcodes = new PostcodesIO();
var mpData = require('./mp-lookup-data.json');

function isPostcodeIsh(query) {
  const postcodeRegex = RegExp('^[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}$');

  return postcodeRegex.test(query);
}

async function lookupByPostcode(query) {
  const postcode = await postcodes.lookup(query);

  if (postcode) {
    return mpData.filter(mp => {
      return postcode.codes.parliamentary_constituency === mp.constituency_onscode;
    });
  }

  return [];
}

function lookupByName(query) {
  const lowerCaseQuery = query.toLowerCase();
  return mpData.filter(mp => {
    if (mp.constituency_name.toLowerCase().includes(lowerCaseQuery) ||
        mp.member_name.toLowerCase().includes(lowerCaseQuery)) {
      return true;
    }
    return false;
  });
}

async function lookupMp(params) {
  const query = params.query;
  var postcodeLookup = false;
  var mps;

  if (isPostcodeIsh(query)) {
    postcodeLookup = true;
    mps = await lookupByPostcode(query);
  } else {
    mps = lookupByName(query);
  }

  return { mps, postcodeLookup };
}

exports.lookupMp = lookupMp;
