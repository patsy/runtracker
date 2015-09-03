var passport = require('passport'),
    fs = require('fs'),
    togeojson = require('togeojson'),
    multer = require('multer'),
    storage = multer.memoryStorage(),
    upload = multer({ storage : storage , limits : { fileSize : 5000000 } }),
    DOMParser = require('xmldom').DOMParser,
    path = require('path'),
    Runtrack = require('./model/schemas').Runtrack,
    User = require('./model/schemas').User,
    FeatureCollection = require('./model/schemas').FeatureCollection;

module.exports = function(app) {

  app.get('/login', function(req, res) {
      res.render('/');
  });

  app.post('/login',
    passport.authenticate('local'),
      function(req, res) {
        if (req.user) {res.redirect('/' + req.user.username + '/map');}
        if (!req.user) {res.redirect('/failure');}
      }
  );

  app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/failure', function(req, res) {
    res.render('failure');
  });

  app.get('/register', function(req, res) {
    res.render('register');
  });

  app.post('/register', function(req, res) {
    console.log("Register user: " + req.body.username);
    User.findOne( {username: req.body.username}, function(err, user) {
      if (err) throw err;
      if (user) {
        console.log("User already exists")
      } else {
          var newUser = new User({username: req.body.username, password: req.body.password});
          newUser.save();
          res.json("User saved");
      }
    })
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/register')
  }
  // Map
  app.get('/:username/map', ensureAuthenticated, function(req, res) {
    var username = req.params.username;
    res.render('map', { title: 'Map', username: username });
  });

  // Default
  app.get('/', function(req, res){
    res.render('index', { title: 'Home'});
  });


  // API

  app.get('/api/point', function(req, res){
    res.json( {'lat': '57.668', 'long': '11.945'} );
  });

  app.get('/api/runtracks', function(req, res){
  	Runtrack.find({}, function (err, runtracks) {
  		if (!err) {
  			res.json(runtracks);
  		}
  		else {
  			res.json("Error when retrieving runtracks");
  		}
  	})
  });

  /* This endpoint reads a file buffer from request and saves it to database */
  app.post('/api/location', upload.array('gpxfiles'), function(req, res) {
    for(fNr=0;fNr<req.files.length;fNr++) {
      /* Create DOM parser and parse xml from buffer to DOM to GeoJSON */
      var domParser = new DOMParser(),
          bufferString = req.files[0].buffer.toString('utf8'),
          xmldom = domParser.parseFromString(bufferString,'text/xml');
      var gpxasgeojson = togeojson.gpx(xmldom);
      console.log(req.files[0].buffer.toString('utf8'));

      /* Create an empty feature collection */
      if (gpxasgeojson.type === 'FeatureCollection') {
        var featureList = [];
        /* Loop over all features in feature collection and add to featureList */
        for(i=0;i<gpxasgeojson.features.length;i++) {
          var feat = {
            "type" : gpxasgeojson.features[i].type,
            "properties" : {
              "name" : gpxasgeojson.features[i].properties.name,
              "time" : Date(gpxasgeojson.features[i].properties.time),
              "coordTimes" : gpxasgeojson.features[i].properties.coordTimes.map(function(el) {
                return Date(el)
              }),
              "altitude" : gpxasgeojson.features[i].geometry.coordinates.map(function(outerEl){
                return outerEl.map(function(innerEl) {
                  return innerEl.slice(2,3);
                })
              })
            },
            "geometry" : {
              "type" : gpxasgeojson.features[i].geometry.type,
              "coordinates" : gpxasgeojson.features[i].geometry.coordinates.map(function(outerEl){
                return outerEl.map(function(innerEl) {
                  return innerEl.slice(0,2);
                })
              })
            },
          };
          featureList.push(feat);
        }
        /* Finally save FeatureCollection model */
        var newFeatureCollection = new FeatureCollection({
          "type" : gpxasgeojson.type,
          "features" : featureList
        });
        console.log("Saving track")
        newFeatureCollection.save(function(err, doc){
          if (err) console.log(err)
        })
      } else {
      console.log("Not a FeatureCollection so not saving to database");
    }
  }
});
  return app;
}
