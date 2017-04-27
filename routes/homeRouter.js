var express = require('express');
var router = express.Router();

var User = require('../models/user');

// home
router.get('/', function (req, res) {
	res.render('home');
});

// Register User
router.post('/register', function (req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	var newUser = new User({
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


// Log In User
router.post('/login', function (req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	
	var someGUY = new User({
		email: email,
		username: username,
		password: password
	});
	
	console.log(username, password);
	User.LogUser(someGUY,  function (err, user) {
		if (err) throw err;
		console.log('in cb');
	});
	

	res.redirect('/');
});



module.exports = router;