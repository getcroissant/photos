var app = require('express')();
var mongoose = require('mongoose');

var HTTP_PORT = process.env.PORT || 3000;
var MONGODB_URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/photo-dev';

require('./server/routes/photoRoute')(app);

mongoose.connect(MONGODB_URL, function(err) {
  if(err) throw err;

  app.listen(HTTP_PORT, function() {
    console.log("Express server running");
  });
});