'use strict';

const leftPad = require('left-pad');

function hello(params) {
  const email = params.email || 'World';
  return { payload: leftPad(`Hello, ${email}!`, 40, ".") };
}

exports.hello = hello;
