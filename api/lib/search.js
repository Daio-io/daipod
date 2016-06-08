'use strict';
const got = require('got');

module.exports = function(q) {

  let url = `https://itunes.apple.com/search?term=${q}&entity=podcast`;

  return new Promise((reject, resolve) => {

    got(url).then(response => {
      resolve(parseResult(response));
    }).catch(err => {
      res.send({'error': err});
    });

  });

};

function parseResult(result) {
  try {
    // todo - extract only the data required
    return JSON.parse(result.body);
  } catch(_) {
    return {'error': 'something went wrong with your search. Please try again'}
  }
}