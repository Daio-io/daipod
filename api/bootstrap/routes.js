'use strict';

const router = require('express').Router();
const search = require('../lib/search');
const feed = require('../lib/feed');

router.get('/feed', (req, res) => {
  let url = req.query.url || '';
  feed(url).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  })
});

router.get('/search', (req, res) => {
  let q = req.query.q || '';
  search(q).then(data => {
    res.send(data);
  }).catch(err =>{
    res.send(err);
  })
});

module.exports = router;