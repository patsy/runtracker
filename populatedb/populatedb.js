var Runtrack = require('./../model/schemas').Runtrack;
	User = require('./../model/schemas').User;

var addSeconds = function(date, seconds) {
    return new Date(date.getTime() + seconds*1000);
}

//Create database connection, connect to db and show errors in console
var mongoose = require('mongoose');
var connectionString = process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/runtracker';
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// Create Users
var defaultuser = new User( {username: 'first', password: 'password'} );
defaultuser.save(function(err) {
	if (err) throw err;
});

var seconduser = new User( {username: 'Jean Banan', password: 'password'} );
seconduser.save(function(err) {
	if (err) throw err;
});

var thirduser = new User( {username: 'Åke', password: 'password'} );
thirduser.save(function(err) {
	if (err) throw err;
});

// Create Tracks
var basedate = new Date();
var track1 = new Runtrack({
	name: 'Track1',
	user_id: 'first',
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

var basedate = new Date();
var track2 = new Runtrack({
	name: 'Track2',
	user_id: 'first',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.805,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.806,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.801,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.899,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.900,
				lat: 11.953
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.903,
				lat: 11.954
			}
		}
	]
});
track2.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track3 = new Runtrack({
	name: 'Track3',
	user_id: 'first',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.705,
				lat: 11.954
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.706,
				lat: 11.954
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.701,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.699,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.700,
				lat: 11.952
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.703,
				lat: 11.953
			}
		}
	]
});
track3.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track4 = new Runtrack({
	name: 'Track4',
	user_id: 'Jean Banan',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.706,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.707,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.702,
				lat: 11.950
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.700,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.701,
				lat: 11.952
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.704,
				lat: 11.953
			}
		}
	]
});
track4.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track5 = new Runtrack({
	name: 'Track5',
	user_id: 'Jean Banan',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.704,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.705,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.700,
				lat: 11.950
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.698,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.699,
				lat: 11.952
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.702,
				lat: 11.953
			}
		}
	]
});
track5.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track6 = new Runtrack({
	name: 'Poopidoo',
	user_id: 'Jean Banan',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.605,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.606,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.601,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.599,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.600,
				lat: 11.953
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.603,
				lat: 11.954
			}
		}
	]
});
track6.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track7 = new Runtrack({
	name: 'Mjau',
	user_id: 'Jean Banan',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.705,
				lat: 11.853
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.706,
				lat: 11.853
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.701,
				lat: 11.851
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.699,
				lat: 11.852
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.700,
				lat: 11.853
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.703,
				lat: 11.854
			}
		}
	]
});
track7.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track8 = new Runtrack({
	name: 'Liten ost',
	user_id: 'Jean Banan',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.605,
				lat: 11.853
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.606,
				lat: 11.853
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.601,
				lat: 11.851
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.599,
				lat: 11.852
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.600,
				lat: 11.853
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.603,
				lat: 11.854
			}
		}
	]
});
track8.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track9 = new Runtrack({
	name: 'Rackarns bra',
	user_id: 'Åke',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 57.705234,
				lat: 11.953234
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 57.706756,
				lat: 11.953456
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 57.701567,
				lat: 11.95146456
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 57.699678,
				lat: 11.95256756
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 57.7003453,
				lat: 11.95334534
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 57.703678,
				lat: 11.954678
			}
		}
	]
});
track9.save(function(err){if (err) console.log('Error on save')});

var basedate = new Date();
var track10 = new Runtrack({
	name: 'Sista rundan',
	user_id: 'Åke',
	points: [
		{
			timestamp: basedate,
			loc: {
				lng: 58.705,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 1),
			loc: {
				lng: 58.706,
				lat: 11.953
			}
		},
		{
			timestamp: addSeconds(basedate, 2),
			loc: {
				lng: 58.701,
				lat: 11.951
			}
		},
		{
			timestamp: addSeconds(basedate, 3),
			loc: {
				lng: 58.699,
				lat: 11.952
			}
		},
		{
			timestamp: addSeconds(basedate, 4),
			loc: {
				lng: 58.700,
				lat: 11.953
			}
		},{
			timestamp: addSeconds(basedate, 5),
			loc: {
				lng: 58.703,
				lat: 11.954
			}
		}
	]
});
track10.save(function(err){if (err) console.log('Error on save')});

mongoose.connection.close();