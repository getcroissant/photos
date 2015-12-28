var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(port, mongodb) {

  var HTTP_PORT = port || process.env.PORT || 4000;
  var MONGODB_URL = mongodb || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/photo-dev';

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  require('./routes/photoRoute')(app);

  mongoose.connect(MONGODB_URL, function(err) {
    if(err) throw err;

    app.listen(HTTP_PORT, function() {
      console.log("Photo api server is starting");
    });
  });
};