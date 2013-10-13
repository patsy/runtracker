var mongoose = require('mongoose');

//define what a kitten looks like, it has a name and a sound
var kittySchema = mongoose.Schema({
		name: String,
		sound: String
	});

//compile the kitten model accordning to schema
var Kitten = mongoose.model('Kitten', kittySchema);
module.exports.Kitten = Kitten;