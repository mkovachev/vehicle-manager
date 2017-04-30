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
router.post('/login', function (req, res) {
	let loginParams = req.body;
	User.LogUser(req, res, loginParams);
});

// Logout
router.get('/logout', function (req, res) {
	req.session.destroy(function () {
		console.log("logout success");
		console.log(this);
		res.redirect('/');
	});
});


module.exports = router;

