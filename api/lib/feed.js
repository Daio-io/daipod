'use strict';

const parser = require('./rss-to-json');

module.exports = function (url) {

  return new Promise((resolve, reject) => {
    // TODO - only use data required
    parser.load(url, (err, parsed) => {
      if (err) {
        reject(err);
      } else {
        resolve(parsed);
      }
    });
  });
};
