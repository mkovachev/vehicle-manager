const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Vehicle = require('../models/vehicle');

// home
router.get('/', function (req, res) {
	res.render('home');
});

// my garage route
router.get('/mygarage', isLoggedIn, function (req, res) {
	res.render('mygarage', {
		layout: false
	});
});

// add vehicle route
router.get('/addvehicle', isLoggedIn, function (req, res) {
	res.render('addvehicle', {
		layout: false
	});
});;


function isLoggedIn(req, res, next) {
	if (req.session.user == null) {
		console.log('Please log in!');
		res.redirect('/');
	} else {
		next();
	}
};

// add vehicle
router.post('/addvehicle', isLoggedIn, function (req, res) {
	const inputParams = req.body;
	const vehicleType = req.body.vehicleType;
	const brand = req.body.brand;
	const model = req.body.model;
	const license = req.body.license;
	const yearOfManufacture = req.body.yearOfManufacture;
	const km = req.body.km;
	const username = req.session.user.username;
	console.log('username is: ' + username);
	console.log('req.session.user.username is: ' + req.session.user.username);

	// input validation
	req.checkBody('brand', 'brand is required').notEmpty();
	req.checkBody('model', 'model is required').notEmpty();
	req.checkBody('license', 'license is required').notEmpty();
	req.checkBody('yearOfManufacture', 'year of manufacture is required').notEmpty();
	req.checkBody('km', 'km is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
	} else {

		const newVehicle = new Vehicle({
			vehicleType,
			brand,
			model,
			license,
			yearOfManufacture,
			km,
			username
		});

		Vehicle.addVehicle(newVehicle);
		console.log(`${newVehicle} added successfully!`);
		res.redirect('/mygarage');
	}
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
router.post('/mygarage', function (req, res) {
	let loginParams = req.body;
	User.findOne({
		"username": loginParams.username
	}, function (err, user) {
		console.log(loginParams);
		if (err) {
			console.log(err);
			return res.status(500).send();
		}
		if (!user) {
			console.log(user);
			return res.status(401).send();
		}

		bcrypt.compare(loginParams.password, user.password, function (err, success) {
			if (err) {
				console.log('password is incorrect!');
				res.redirect('/');
			}

			if (success) {
				req.session.user = user;
				res.redirect('/mygarage');
				console.log('logged in successfully!');
				return res.status(200).send();
			}
		});
	});
});

// Logout
router.get('/logout', function (req, res) {
	if (req.session.user != null) {
		req.session.destroy(function (err) {
			res.end("Logout success");
			req.logout();
			res.redirect('/');
		});
	}
});

module.exports = router;