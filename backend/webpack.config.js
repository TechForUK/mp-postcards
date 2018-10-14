const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
      main: `${__dirname}/index`
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'node'
};
