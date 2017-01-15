'use strict';

const http = require('http');
const Express = require('express');
const app = Express();
const bootstrap = require('./api/bootstrap/bootstrap');
const config = require('./api/bootstrap/config');

bootstrap(app);

app.get('/status', (_, res) => {
  res.send('OK')
})

const server = http.createServer(app);

function startServer() {
  server.listen(config.PORT, () => {
    console.log('CapsuleAPI started on port:', config.PORT);
  });
  
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer();
}