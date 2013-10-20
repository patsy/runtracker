var mongoose = require('mongoose');

//define what a kitten looks like, it has a name and a sound
var kittySchema = mongoose.Schema({
	name: String,
	sound: String
	});

//define a runtrack as an object containing a collection of timestamped lng/lat pairs
var runtrackSchema = mongoose.Schema({
	name: String,
	points: [
				{
					timestamp: Date,
					loc: {
						lng: Number,
						lat: Number
					}
				}
	]
});

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.methods.validPassword = function (passw) {
	if (passw === this.password) {return true}
	else {return false}
};

//compile the  models accordning to schema
var Kitten = mongoose.model('Kitten', kittySchema);
var Runtrack = mongoose.model('Runtrack', runtrackSchema);
var User = mongoose.model('User', userSchema);
//export models
module.exports.Kitten = Kitten;
module.exports.Runtrack = Runtrack;
module.exports.User = User;