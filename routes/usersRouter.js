var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('landing');
});

// Register User
router.post('/register', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	var newUser = new User({
		username: username,
		password: password
	});

	User.createUser(newUser, function (err, user) {
		if (err) throw err;
		console.log(user);
	});

	console.log((`You are registered successfully, please login`));

	res.redirect('/');
});


module.exports = router;