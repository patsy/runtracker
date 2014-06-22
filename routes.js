var passport = require('passport'),
    Runtrack = require('./model/schemas').Runtrack,
    User = require('./model/schemas').User;

module.exports = function(app) {
  
  app.get('/login', function(req, res) {
      res.render('/');
  });

  app.post('/login', 
    passport.authenticate('local', 
    { successRedirect: '/map',
      failureRedirect: '/failure',
      failureFlash: true })
  );

  app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/failure', function(req, res) {
    res.render('failure');
  });

  // Register
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
  app.get('/map', ensureAuthenticated, function(req, res) {
    res.render('map');
  });

  // Default
  app.get('/', function(req, res){
    res.render('home');
  });


  // API

  app.get('/api/point', function(req, res){
    res.json( {'lat': '57.668', 'long': '11.945'} );
  });

  app.get('/api/runtrack', function(req, res){
  	Runtrack.find({name: 'Track1'}, function (err, runtracks) {
  		if (!err) {
  			res.json(runtracks);
  		}
  		else {
  			res.json("Error when retrieving runtracks");
  		}
  	})
  });
  return app;
}