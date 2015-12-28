var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var photoSchema = new mongoose.Schema({
  url: String,
  description: String,
  tags: [String],
  contentType: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Photo', photoSchema);
