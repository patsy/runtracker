var Kitten = require('./../model/schemas').Kitten;
var Runtrack = require('./../model/schemas').Runtrack;
var User = require('./../model/schemas').User;

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
rolf.save(function(err){if (err) console.log('Error on save new kitten Rolf')});
max.save(function(err){if (err) console.log('Error on save new kitten Max')});

var defaultuser = new User( {username: 'default', password: 'password'} );
defaultuser.save(function(err){if (err) console.log('Error on save new user')})

var basedate = new Date();
var track1 = new Runtrack({
	name: 'Track1',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.705,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.706,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.701,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.699,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.700,
				lat: 11.953
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.703,
				lat: 11.954
			}
		}
	]
});
track1.save(function(err){if (err) console.log('Error on save')});

mongoose.connection.close();