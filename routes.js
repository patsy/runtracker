var passport = require('passport'),
    fs = require('fs'),
    togeojson = require('togeojson'),
    multer = require('multer'),
    DOMParser = require('xmldom').DOMParser,
    path = require('path'),
    Runtrack = require('./model/schemas').Runtrack,
    User = require('./model/schemas').User,
    Loc = require('./model/schemas').Loc;

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

  app.post('/api/location', function(req, res) {
    var filePath = req.files[0].path;
    fs.readFile(path.join(__dirname, filePath), 'utf8', function(err, xmlStr) {
      if (err) { console.log("Could not read file " + path.join(__dirname, filePath))};
      var dom = (new DOMParser()).parseFromString(xmlStr, 'text/xml');
      var gpxasgeojson = togeojson.gpx(dom);
      var str = JSON.stringify(gpxasgeojson);
      fs.writeFile(path.join(__dirname, "gpxfile.gpx"), str, function(err) {
        if (err) return console.log(err);
      })
      console.log("Geometry type: " + gpxasgeojson.features[0].geometry.type);
      // starting with multilinestring : [ [ [long,lat,alt],..], [ [long,lat,alt],...],... ] or multilinestring(linestring(coordinates))
      // strip altitude value from all coordinates
      // var strippedCoordinates = gpxasgeojson.features[0].geometry.coordinates.map(function(obj) { //map each linestring in multilinestring
      //   obj.map(function(el) { // map each coordinate in linestring
      //     return new Array(el[0],el[1]) // replace with [long,lat]  for each element in linestring
      //   });
      //   return obj; // replace with same object for each element in multilinestring
      // })
      for(i=0;i<gpxasgeojson.features[0].geometry.coordinates.length;i++) { // loop over linestrings
        for(j=0;j<gpxasgeojson.features[0].geometry.coordinates[i].length;j++) { // loop over coordinates
          gpxasgeojson.features[0].geometry.coordinates[i][j] = gpxasgeojson.features[0].geometry.coordinates[i][j].slice(0,2) // replace coordinate value
        }
      }
      //console.log('strippedCoordinates' + JSON.stringify(gpxasgeojson.features[0].geometry.coordinates));


      var newLoc = new Loc({
        type : 'Feature',
        loc : {
          type : 'LineString',
          coordinates : gpxasgeojson.features[0].geometry.coordinates
        },
        properties : 'Awesome'
      });
      console.log("Saving track")
      newLoc.save(function(err, doc){
        if (err) console.log(err)
      })
    });
  })

  return app;
}
