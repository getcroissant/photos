var PhotoService = require('core').PhotoService();

module.exports = function(app) {

  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Coworking Photos', youAreUsingJade: true});
  });

  app.get('/photo/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.findById(photoId).then(function(photo) {
      return res.render('photo', {title: 'Photo', photo: photo});
    }).fail(function(err) {
      console.log(err);
      return next(err);
    }).done();
  });

  app.post('/api/photos', function(req, res, next) {
    var contentType = req.body.contentType;
    var description = req.body.description;
    var tags = req.body.tags;

    PhotoService.create(contentType, description, tags).then(function(photo) {
      return res.json(photo)
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

  app.get('/api/photos/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.findById(photoId).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return next(err);
    }).done();
  });

  app.put('/api/photos/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;
    var url = req.body.url;
    var description = req.body.description;
    var tags = req.body.tags;

    PhotoService.update(photoId, url, description, tags).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

  app.delete('/api/photos/:photoId', function(req, res, next) {
    var photoId = req.params.photoId;

    PhotoService.remove(photoId).then(function(photo) {
      return res.json(photo);
    }).fail(function(err) {
      return res.error(err);
    }).done();
  });

};


