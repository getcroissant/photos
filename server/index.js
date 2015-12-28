var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var HTTP_PORT = process.env.SERVER_PORT || 3000;
var MONGODB_URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/photo-dev';

//Setting up views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Public folder
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/photoRoute')(app);

mongoose.connect(MONGODB_URL, function(err) {
  if(err) throw err;

  app.listen(HTTP_PORT, function() {
    console.log("Photo server running");
  });
});