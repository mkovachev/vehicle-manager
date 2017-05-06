const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Event = require('../models/event');

// --------------- Routes ---------------------

// home
router.get('/', function (req, res) {
	res.render('home');
});

// add vehicle
router.get('/addvehicle', isLoggedIn, function (req, res) {
	res.render('addvehicle', {
		layout: false
	});
});

// add event
router.get('/addevent', isLoggedIn, function (req, res) {
	res.render('addevent', {
		layout: false
	});
});

// logout
router.get('/logout', isLoggedOut, function (req, res) {
	res.render('home');
});

// helpers
function isLoggedIn(req, res, next) {
	if (req.session.user == null) {
		console.log('Please log in!');
		res.redirect('/');
	} else {
		next();
	}
};

function isLoggedOut(req, res, next) {
	if (req.session.user != null) {
		req.session.destroy(function (err) {
			res.redirect('/');
			res.end("Logout success");
			return;
		});
	} else {
		next();
	}
};
// Filtering out properties TODO
function replacer(key, value) {
	if (typeof value === Schema.ObjectId) {
		return undefined;
	}
	return value;
}

//------------------------- VIEWs ---------------

// maintenance - all events per vehicle view
//router.get('/maintenance', isLoggedIn, function (req, res, next) {
//	// select clicked vehicle TODO
//	const vehicleLicense = req.body.vehicle.license;
//	Event.find({
//		"vehicleLicense": vehicleLicense
//	}, function (err, vehicle) {
//		console.log(vehicle);
//		if (err) {
//			console.log('vehicle not found, check your input!');
//			req.flash('error', err);
//		} else if (vehicle === null || vehicle === 'undefined') {
//			req.flash('error', 'This vehicle has no events yet, //add one now');
//			res.redirect('addevent');
//			return;
//		} else {
//			events: events,
//				helpers: {
//					json: function (context) {
//						return JSON.stringify(context);
//					}
//				}
//			});
//			return;
//		}
//	})
//});

// mygarage - all vehicle per user view
router.get('/mygarage', isLoggedIn, function (req, res, next) {
	const id = req.session.user._id;
	Vehicle.find({
		"owner": id
	}, function (err, vehicles) {
		if (err) {
			req.flash('error', err);
		} else if (vehicles.length === 0) {
			req.flash('error', 'This user has no vehicles, add one first');
			res.redirect('addvehicle');
			return;
		} else {
			res.render('mygarage', {
				layout: false,
				vehicles: vehicles,
				helpers: {
					json: function (context) {
						return JSON.stringify(context);
					}
				}
			});
			return;
		}
	})
});


//--------------------POST requests --------------
// add event
router.post('/addevent', isLoggedIn, function (req, res) {
	const inputParams = req.body;
	const title = req.body.title;
	const description = req.body.description;
	const km = req.body.km;
	const cost = req.body.cost;
	const vehicleLicense = req.body.vehicleLicense;

	// input validation
	req.checkBody('title', 'title is required').notEmpty();
	req.checkBody('description', 'description is required').notEmpty();
	req.checkBody('km', 'km is required').notEmpty();
	req.checkBody('cost', 'cost is required').notEmpty();
	req.checkBody('vehicleLicense', 'vehicleLicense is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
		return;
	} else {
		const newEvent = new newEvent({
			title,
			description,
			km,
			cost,
			vehicleLicense
		});
		Event.addEvent(newEvent);
		vehicle.events.push(newEvent._id); // TODO
		res.redirect('/maintenance');
		return;
	}
});

// add vehicle
router.post('/addvehicle', isLoggedIn, function (req, res) {
	const inputParams = req.body;
	const vehicleType = req.body.vehicleType;
	const brand = req.body.brand;
	const model = req.body.model;
	const license = req.body.license;
	const yearOfManufacture = req.body.yearOfManufacture;
	const km = req.body.km;

	const user = req.session.user;

	// input validation
	req.checkBody('brand', 'brand is required').notEmpty();
	req.checkBody('model', 'model is required').notEmpty();
	req.checkBody('license', 'license is required').notEmpty();
	req.checkBody('yearOfManufacture', 'year of manufacture is required').notEmpty();
	req.checkBody('km', 'km is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
		return;
	} else {
		const newVehicle = new Vehicle({
			vehicleType,
			brand,
			model,
			license,
			yearOfManufacture,
			km,
			'owner': user._id
		});
		Vehicle.addVehicle(newVehicle);
		user.vehicles.push(newVehicle._id); // TODO
		res.redirect('/mygarage');
		return;

		// not working
		//User.findByIdAndUpdate(req.session.user.id, function (err, //res) {
		//	if (err) {
		//		console.log(err);
		//	}
		//	user.vehicles.push(newVehicle);
		//});
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
			return;
		} else {
			const errors = req.validationErrors();
			if (errors) {
				console.log(errors);
				return;
			} else {
				const newUser = new User({
					email: email,
					username: username,
					password: password
				});
				User.createUser(newUser);
				console.log("Registered successfully!");
				res.redirect('/');
				return;
			}
		}
	});
	return;
});

// Login
router.post('/mygarage', function (req, res) {
	const loginParams = req.body;
	const username = req.body.username;
	const password = req.body.password;

	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'model is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		console.log(errors);
		return;
	} else {
		User.findOne({
			"username": loginParams.username
		}, function (err, user) {
			if (err) {
				console.log(err);
				return;
			}
			if (!user || user === null) {
				console.log('user does not exist');
				res.redirect('/');
				return;
			}

			bcrypt.compare(loginParams.password, user.password, function (err, success) {
				if (err) {
					console.log('password is incorrect!');
					res.redirect('/');
					return;
				}

				if (success) {
					req.session.user = user;
					res.redirect('/mygarage');
					console.log('logged in successfully!');
					return;
				}
			});
		});
	}
});

module.exports = router;