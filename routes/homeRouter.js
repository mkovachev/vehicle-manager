const express = require('express');
const router = express.Router();
const jquery = require('jquery');
const toastr = require('toastr');

const User = require('../models/user');

// home
router.get('/', function (req, res) {
	res.render('home');
});

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
router.post('/login', function (req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	var someGUY = new User({
		email: email,
		username: username,
		password: password
	});
	User.LogUser(someGUY, function (err, user) {
		if (err) throw err;
		console.log(`${username} has just logged in!`);
	});
	//toastr.success("You are logged in");
	res.redirect('/');
});


module.exports = router;