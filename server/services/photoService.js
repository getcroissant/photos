var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || 'AKIAIY66Z6GPB5BGYQAQ';
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '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';
var AWS_FOLDER_NAME = process.env.AWS_FOLDER_NAME || 'dev';
var BUCKET_NAME = process.env.BUCKET_NAME || 'croissant-photos';

var Q = require('q');
var AWS = require('aws-sdk');
var mime = require('mime-types');

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

    create: function(contentType, description, tags) {
      var directory = 'photos';
      var fileExtension = mime.extension(contentType);

      var data = {
        contentType: contentType
      };
      return PhotoService._create(data).then(function(photo) {
        var bucketKey = AWS_FOLDER_NAME + '/' + directory + '/' + photo._id + '.' + fileExtension;
        var url = 'https://s3.amazonaws.com/' + BUCKET_NAME + '/' + bucketKey;

        return PhotoService.update(photo._id, url, description, tags).then(function(photo) {

          return PhotoService.createS3SignedUrl(bucketKey, contentType).then(function(s3) {
            return Q.resolve({s3Path: s3});
          });
        });
      });
    },

    createS3SignedUrl: function(bucketKey, contentType) {
      return Q.promise(function(resolve, reject) {
        var data = {
          Bucket: BUCKET_NAME,
          Key: bucketKey,
          Expires: 60,
          ContentType: contentType,
          ACL: 'public-read'
        };
        var s3 = new AWS.S3({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        s3.getSignedUrl('putObject', data, function(err, data) {
          if(err) return reject(Error.AWS_FAILURE);
          return resolve(data);
        });
      });
    },

    update: function(id, url, description, tags) {
      var condition = {_id: id};
      var update = {url: url, description: description, tags: tags};

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