var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

//define a runtrack as an object containing a collection of timestamped lng/lat pairs
var runtrackSchema = mongoose.Schema({
	name: String,
	user_id: String,
	points: [
				{
					timestamp: Date,
					loc: {
						lng: Number,
						lat: Number
					},
				}
	]
});

var LocSchema = mongoose.Schema({
	type : { type : String },
	loc: {
		type: { type : String },
		coordinates : { type : [], index : '2dsphere' }
	},
	properties : { type : String }
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

var Runtrack = mongoose.model('Runtrack', runtrackSchema);
var User = mongoose.model('User', userSchema);
var Loc = mongoose.model('Loc', LocSchema);

module.exports.Runtrack = Runtrack;
module.exports.Loc = Loc;
module.exports.User = User;
