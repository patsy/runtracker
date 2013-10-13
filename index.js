
var express = require('express');
var app = express();
var populate = require('./populatedb/populatedb');
var Kitten = require('./model/kitten').Kitten;

//Create database connection using mongoose
var mongoose = require('mongoose');
//the connectionstring defines mongodb protocol, host and database
var connectionString = 'mongodb://localhost/runtracker';
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error')); //bind errors to console

//callback function that creates two kittens is executed once the connection is open
//TODO: this will add documents to collection every time the app is run...
db.once('open', function callback () {
	populate.populatedb();
});

//---------------------
//Create routes
app.listen(process.env.PORT || 5432);

//Returns the sound of Rolf from mongodb
app.get('/kitten', function(req, res){
	Kitten.find({name: 'Rolf'}, function (err, kittens) {
		if (!err) {
			res.json(kittens);
		}
		else {
			res.json("ERROR, ABONDON SHIP");
		}
	})
});

//Fox route
app.get('/fox', function(req, res){
  var q = "Hello my foxy pony!";
  res.json(q);
});

//Default route
app.get('/', function(req, res){
  var q = "Hello my little pony!";
  res.json(q);
});
