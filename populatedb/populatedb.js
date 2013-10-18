var Kitten = require('./../model/schemas').Kitten;

var populatedb = function () {		
	var rolf = new Kitten({name: 'Rolf', sound: 'weeow'});
	var max = new Kitten({name: 'Max', sound: 'piip'});
	rolf.save(function(err){if (err) console.log('Error on save')});
	max.save(function(err){if (err) console.log('Error on save')});
};
module.exports.populatedb = populatedb;