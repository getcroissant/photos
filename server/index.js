var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(port) {

  var HTTP_PORT = port || process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  require('./routes/photoRoute')(app);

  app.listen(HTTP_PORT, function() {
    console.log("Photo public server is starting");
  });

};