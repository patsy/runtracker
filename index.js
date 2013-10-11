
var express = require('express');
var app = express();

//Create database connection using mongoose
var mongoose = require('mongoose');
//the connectionstring means the mongodb running locally on your computer
//under database runtracker using collection test
//you will of course need to populate this to get out any data from the request
var connectionString = 'mongodb://localhost/runtracker/test';
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error')); //bind errors to console
//callback function is executed once the connection is open
db.once('open', function callback () {
	//do nothing so far
});
//define what a kitten looks like, it has a name and a sound
var kittySchema = mongoose.Schema({
		name: String,
		sound: String
	});
//compile the kitten model accordning to schema
var Kitten = mongoose.model('Kitten', kittySchema);

app.listen(process.env.PORT || 5432);

//Returns the sound of Rolf from mongodb
app.get('/kitten', function(req, res){
 	Kitten.find({name: 'Rolf'}, function (err, kittens) {
 		if (err) {
 			res.json("ERROR, ABONDON SHIP");
 		}
 		console.log(kittens);
 		res.json(kittens);
 	})
});

app.get('/fox', function(req, res){
  var q = "Hello my foxy pony!";
  res.json(q);
});

app.get('/', function(req, res){
  var q = "Hello my little pony!";
  res.json(q);
});
