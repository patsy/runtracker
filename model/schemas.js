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

// The FeatureCollectionSchema can store geolocation and metadata in GeoJSON
var FeatureCollectionSchema = mongoose.Schema({
	type : { type : String },
	username : { type : String },
	features : [ {
		type : { type : String }, // Feature
		properties : {
			name : { type : String },
			time : { type : Date },
			coordTimes : [Date],
			altitude : { type : [] }
		},
		geometry: {
			type : { type : String }, // Point, LineString, MultiLineString, Polygon...
			coordinates : []
		}
	} ]
});
// Add 2dsphere index to FeatureCollectionSchema to enable geo searchs
FeatureCollectionSchema.index({"geometry" : "2dsphere"});
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
var FeatureCollection = mongoose.model('FeatureCollection', FeatureCollectionSchema);

module.exports.Runtrack = Runtrack;
module.exports.FeatureCollection = FeatureCollection;
module.exports.User = User;
