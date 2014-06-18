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
      // suppose the password was wrong...
      user.comparePassword(password, function(err, isMatch) {
        if (err) return done(err);
        return done(null, user);
      });
      // if (!user.comparePassword(password)) {
      // 	console.log('Incorrect password');
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // suppose the password is correct...
      return done(null, user);
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





//Returns the sound of Rolf from mongodb
app.get('/api/kitten', function(req, res){
	Kitten.find({name: 'Rolf'}, function (err, kittens) {
		if (!err) {
			res.json(kittens);
		}
		else {
			res.json("Error when retrieving kittens");
		}
	})
});

//Map route
app.get('/map', function(req, res) {
	res.render('map');
});

//API routes
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

//Login
app.post('/login',
  passport.authenticate('local', { successRedirect: '/map',
                                   failureRedirect: '/failure',
                                   failureFlash: false })
);

// Logout
app.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Register user
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

// Failure to login
app.get('/failure', function(req, res) {
  res.render('failure');
});

//Default  route
app.get('/', function(req, res){
  res.render('home');
});



