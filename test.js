var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/test';
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error')); //bind errors to console
//callback function is executed once the connection is open
db.once('open', function callback () {
	

});
//define what a kitten looks like
var kittySchema = mongoose.Schema({
		name: String,
		sound: String
	});
var Kitten = mongoose.model('Kitten', kittySchema);
//add find function to 
Kitten.find(function (err, kittens) {
	return kittens;
});