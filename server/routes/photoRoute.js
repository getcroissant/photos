var PhotoService = require('core').PhotoService();

module.exports = function(app) {

  app.get('/', function(req, res, next) {
    PhotoService.findPhotos().then(function(photos) {
      return res.render('index', {photos: photos});
    }).fail(function(err) {
      console.log(err);
      return next(err);
    }).done();
  });

  app.get('/upload', function(req, res, next) {
    return res.render('upload');
  });

  app.get('/photo/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.findById(photoId).then(function(photo) {
      return res.render('photo', {photo: photo});
    }).fail(function(err) {
      console.log(err);
      return next(err);
    }).done();
  });

};


