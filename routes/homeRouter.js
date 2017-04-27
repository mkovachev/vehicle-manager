var express = require('express');
var router = express.Router();

var User = require('../models/user');

// home
router.get('/', function (req, res) {
	res.render('home');
});

// Register User
router.post('/', function (req, res) {
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

	iziToast.show({
		title: 'Hey',
		message: 'What would you like to add?'
	});

	//toastr.success('You are registered, please login', {
	//	timeOut: 5000
	//});

	res.redirect('/');
});


module.exports = router;