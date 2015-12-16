var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var photoSchema = new mongoose.Schema({
  url: {type: String, required: true},
  created: {type: Date, default: Date.now},
  tags: [String]
});

module.exports = mongoose.model('Photo', photoSchema);
