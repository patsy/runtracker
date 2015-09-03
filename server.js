var express = require('express'),
	path = require('path'),
	bodyparser = require('body-parser'),
	multer = require('multer'),
	passport = require('passport'),
	session = require('express-session'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./model/schemas').User,
	server = express(),
	storage = multer.memoryStorage();


var localStrategy = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
      	console.log('No user: ' + username + ' found');
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.comparePassword(password, function(err, isMatch) {
        // suppose the password was wrong...
        if (err) { return done(err); }
        // suppose the password is correct...
        console.log('isMatch: ' + isMatch);
        console.log('user.username: ' + user.username);
        console.log('user.password: ' + user.password);
        return done(null, user);
      });
    });
  }
);

//serve static files from public directory
server.use(express.static(__dirname + "/public"));
// Everything in '/public' will be "mounted" in '/public'
server.use('/public', express.static(path.join(__dirname, '/public')));
server.set('view engine', 'jade');


//server.use(express.bodyParser());
server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
server.use(session({ secret: 'SECRET', cookie: {maxAge: 60000}, resave: true, saveUninitialized: true }));
// Configure passport
server.use(passport.initialize());
server.use(passport.session());

passport.use(localStrategy);
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
        if(err) done(err);
        done(null,user);
      });
    });

module.exports = server;
