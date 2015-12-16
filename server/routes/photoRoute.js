var PhotoService = require('../services/photoService.js')();

module.exports = function(app) {

  app.post('/api/photo', function(req, res, next) {
    var contentType = req.body.contentType;
    var description = req.body.description;
    var tags = req.body.tags;

    PhotoService.create(contentType, description, tags).then(function(photo) {
      return res.json(photo)
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

  app.get('/api/photo/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.findById(photoId).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

  app.put('/api/photo/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;
    var url = req.body.url;
    var tags = req.body.tags;

    PhotoService.update(photoId, url, tags).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

  app.delete('/api/photo/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.remove(photoId).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

};


