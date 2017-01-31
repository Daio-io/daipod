'use strict';

const routes = require('../routes');
const config = require('./config');

module.exports = (app) => {

  app.use((req, res, next) => {
    res.set('Cache-Control', `max-age=${config.CACHE}`);
    res.set('Connection', 'close');
    next()
  });

  app.use('/', routes);
};