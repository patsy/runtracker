var Kitten = require('./../model/schemas').Kitten;
var Runtrack = require('./../model/schemas').Runtrack;

var addSeconds = function(date, seconds) {
    return new Date(date.getTime() + seconds*1000);
}

//Create database connection, connect to db and show errors in console
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/runtracker';
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

var rolf = new Kitten({name: 'Rolf', sound: 'weeow'});
var max = new Kitten({name: 'Max', sound: 'piip'});
rolf.save(function(err){if (err) console.log('Error on save')});
max.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track1 = new Runtrack({
	name: 'Track 1',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.665,
				lat: 11.453
			}
		}
	]
});
track1.save(function(err){if (err) console.log('Error on save')});
