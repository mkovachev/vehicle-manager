const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true
	}
	//authToken: { TODO
	//	type: String
	//}
});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

// Niki Login TODO
//module.exports.LogUser = function (user, callback) {
//	User.findOne({
//		"username": user.username
//	}, function (err, foundUser) {
//		bcrypt.genSalt(10, function (err, salt) {
//			bcrypt.hash(user.password, salt, function (err, hash) {
//				bcrypt.compare(foundUser.password, hash, function (err, res) //{
//					console.log('success');
//					foundUser.authToken = hash;
//					foundUser.save(callback);
//				});
//			});
//		});
//	});
//}