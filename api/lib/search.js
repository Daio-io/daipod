'use strict';
const got = require('got');

module.exports = function(q) {

  let url = `https://itunes.apple.com/search?term=${q}&entity=podcast`;

  return new Promise((reject, resolve) => {

    got(url).then(response => {
      let data = parseResult(response);
      resolve(data);
    }).catch(err => {
      res.send({'error': err});
    });

  });

};

function parseResult(result) {
  try {
    // todo - extract only the data required
    let json = JSON.parse(result.body);

    json.results = json.results.map((item) => {

      return {
        artist: item.artistName,
        track: item.trackName,
        imageUrl: item.artworkUrl100.replace('100x100', '500x500'),
        feedUrl: item.feedUrl,
        collection: item.collectionName
      }
    });

    return json

  } catch(_) {
    return {'error': 'something went wrong with your search. Please try again', results: []}
  }
}