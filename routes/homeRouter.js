const express = require('express');
const router = express.Router();

const User = require('../models/user');

// home
router.get('/', function (req, res) {
	res.render('home');
});

// Register User
router.post('/', function (req, res) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	const newUser = new User({
		email: email,
		username: username,
		password: password
	});

	User.createUser(newUser, function (err, user) {
		if (err) throw err;
		console.log(user);
	});

	res.redirect('/');
});


module.exports = router;