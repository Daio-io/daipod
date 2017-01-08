'use strict';

const routes = require('../routes');
const config = require('./config');

module.exports = (app) => {

  app.use((req, res, next) => {
    res.set('Cache-Control', `max-age=${config.CACHE}`);
    next()
  });

  app.use('/', routes);
};