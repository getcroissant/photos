var Q = require('q');
var Error = require('../error.js');
var Photo = require('../models/photo.js');

module.exports = function() {

  var PhotoService = {

    _create: function(data) {
      return Q(Photo.create(data));
    },

    _findOne: function(condition) {
      return Q.promise(function(resolve, reject) {
        Photo.findOne(condition, function(err, obj) {
          if(err) return reject(Error.DATABASE);
          return resolve(obj);
        });
      });
    },

    _update: function(condition, update, options) {
      return Q.promise(function(resolve, reject) {
        Photo.update(condition, update, options, function(err, obj) {
          if(err) return reject(Error.DATABASE);
          if(!obj) return reject(Error.NOT_FOUND);
          return resolve(obj);
        });
      })
    },

    _remove: function(condition) {
      return Q.promise(function(resolve, reject) {
        Photo.remove(condition, function(err, obj) {
          if(err) return reject(Error.DATABASE);
          return resolve(obj);
        });
      });
    },

    create: function(url, tags) {
      var data = {
        url: url,
        tags: tags
      };

      return PhotoService._create(data);
    },

    update: function(id, tags) {
      var condition = {_id: id};
      var update = {tags: tags};

      return PhotoService._update(condition, update);
    },

    remove: function(id) {
      var condition = {_id: id};
      return PhotoService._remove(condition);
    },

    findById: function(id) {
      var condition = {_id: id};
      return PhotoService._findOne(condition);
    },

    generate: function() {

    }

  };

  return PhotoService

};