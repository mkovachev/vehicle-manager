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
	},
	authToken: {
		type: String
	}
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


module.exports.LogUser = function (req, res, loginParams) {
	User.findOne({
		"username": loginParams.username
	}, function (err, user) {
		console.log(loginParams);
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		if (!user) {
			return res.status(401).send();
		}

		bcrypt.compare(loginParams.password, user.password, function (err, success) {
			if (err) {
				console.log('password is incorrect!');
				res.redirect('/');
			}

			if (success) {
				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(loginParams.password, salt, function (err, hash) {

						console.log('success');
						user.authToken = hash;
						user.save(res);

					});
				});

				req.session.user = user;
				res.redirect('/mygarage');
				console.log('logged in!');
				return res.status(200).send();
			}
		});
	});
}