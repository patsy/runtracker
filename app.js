var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
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
//serve static files from public directory
app.use(express.static(__dirname + "/public"));
// Everything in '/public' will be "mounted" in '/public'
app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(process.env.PORT || 5432);

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
			res.json("ERROR, ABONDON SHIP");
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

app.get('/api/fox', function(req, res){
  var q = "Hello my foxy pony!";
  res.json(q);
});

//Default  route
app.get('/', function(req, res){
  res.render('map');
});



