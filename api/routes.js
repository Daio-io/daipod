'use strict';

const router = require('express').Router();
const search = require('./lib/search');
const feed = require('./lib/feed');

router.get('/feed', (req, res) => {
  let url = req.query.url || '';
  feed(url).then(data => {
    res.json(data);
  }).catch(err => {
    let message = `Error. Feed ${url} not found - ${err.message}`
    console.log(message);
    res.status(404).json({message: message, items: []});
  })
});

router.get('/search', (req, res) => {
  let q = req.query.q || '';
  search(q).then(data => {
    res.json(data);
  }).catch(err =>{
    let message = `Error. Search for ${q} not found - ${err.message}`
    console.log(message);
    res.status(404).json({message: message, results: []});    
  })
});

module.exports = router;