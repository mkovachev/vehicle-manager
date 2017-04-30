const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// home
router.get('/', function (req, res) {
	res.render('home')
});

// my garage
router.get('/mygarage', function (req, res) {
	res.render('mygarage', {
		layout: false
	});
});;

// Register
router.post('/', function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	// input validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	User.findOne({
		"username": username,
		"email": email
	}).then(user => {
		if (user) {
			console.log('User exists!');
		} else {
			const errors = req.validationErrors();
			if (errors) {
				console.log(errors);
			} else {
				const newUser = new User({
					email: email,
					username: username,
					password: password
				});
				User.createUser(newUser);
				console.log("Registered successfully!");
			}
		}
		res.redirect('/');
	});
});

// Login
router.post('/mygarage', function (req, res) {
	let loginParams = req.body;
	User.findOne({
		"username": loginParams.username
	}, function (err, user) {
		console.log(loginParams); // params are not taken!
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
				res.redirect('/mygarage');
				req.session.user = user;
				console.log('logged in!');
				return res.status(200).send();
			}
		});
	});
});

// Logout
router.get('/logout', function (req, res) {
	req.session.destroy(function () {
		console.log("logout success");
		res.redirect('/');
	});
});


module.exports = router;

// Niki Login TODO
//router.post('/login', function (req, res) {
//	var email = req.body.email;
//	var username = req.body.username;
//	var password = req.body.password;
//
//	var someGUY = new User({
//		email: email,
//		username: username,
//		password: password
//	});
//	User.LogUser(someGUY, function (err, user) {
//		if (err) throw err;
//		console.log(`${username} has just logged in!`);
//	});
//	//toastr.success("You are logged in");
//	res.redirect('/mygarage');
//});