var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

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
	username: { type: String, required: true, index: { unique: true} },
	password: { type: String, required: true }
});

userSchema.pre('save', function(next) { 
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

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