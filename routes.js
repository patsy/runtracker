var passport = require('passport'),
    Runtrack = require('./model/schemas').Runtrack,
    User = require('./model/schemas').User;

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
  return app;
}