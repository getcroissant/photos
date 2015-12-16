var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 3000;
var MONGODB_URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/photo-dev';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./server/routes/photoRoute')(app);

mongoose.connect(MONGODB_URL, function(err) {
  if(err) throw err;

  app.listen(HTTP_PORT, function() {
    console.log("Express server running");
  });
});