'use strict';

const http = require('http');
const Express = require('express');
const app = Express();
const bootstrap = require('./api/bootstrap/bootstrap');
const config = require('./api/bootstrap/config');

bootstrap(app);

http.createServer(app).listen(config.PORT, () => {
  console.log('App started on port:', config.PORT);
});
