var mongoose = require('mongoose');

//define what a kitten looks like, it has a name and a sound
var kittySchema = mongoose.Schema({
	name: String,
	sound: String
	});

//define a runtrack as an object containing a collection of timestamped lng/lat pairs
var runtrackSchema = mongoose.Schema({
	name: String,
	points: {
		index: {
			type: Number,
			unique: true
			},
		timeStamp: Date,
		loc: {
			lng: Number,
			lat: Number,
		}
	}
});

//compile the  models accordning to schema
var Kitten = mongoose.model('Kitten', kittySchema);
var Runtrack = mongoose.model('Runtrack', runtrackSchema);
//export models
module.exports.Kitten = Kitten;
module.exports.Runtrack = Runtrack;