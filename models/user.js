var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	authToken: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.LogUser = function (user, callback) {

	User.findOne({ "username": user.username}, function(err, foundUser) {
		
		bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			bcrypt.compare(foundUser.password, hash, function(err, res) {
				console.log('success');
				foundUser.authToken = hash;
				foundUser.save(callback);
			});
			
			
		});
	});
		}
	);
	
}
