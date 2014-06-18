var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var hbs = require('hbs');
var Kitten = require('./model/schemas').Kitten;
var Runtrack = require('./model/schemas').Runtrack;
var User = require('./model/schemas').User;

//Create database connection, connect to db and show errors in console
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/runtracker';
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//---------------------
//serve static files from public directory
app.use(express.static(__dirname + "/public"));
// Everything in '/public' will be "mounted" in '/public'
app.use('/public', express.static(path.join(__dirname, '/public')));

//Configure passport for authentication
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) {
      	console.log('No user: ' + username + ' found');
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.comparePassword(password, function(err, isMatch) {
        // suppose the password was wrong...
        if (err) return done(err);
        // suppose the password is correct...
        console.log('isMatch: ' + isMatch);
        console.log('user.username: ' + user.username);
        console.log('user.password: ' + user.password);
        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
        if(err) done(err);
        done(null,user);
      });
    });

app.listen(process.env.PORT || 5432);
console.log("Started server running 'runtracker' at port 5432");

//define html files to be used with templating engine
app.set('view engine', 'html');
//load templating engine
app.engine('html', hbs.__express);

// ROUTES

//Login
  app.get('/login', function(req, res) {
      res.render('/', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.json(res.user);
  });

// Failure to login
app.get('/failure', function(req, res) {
  res.render('failure');
});

// Logout
app.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
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

// Map 
app.get('/map', passport.authenticate('local'), function(req, res) {
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
