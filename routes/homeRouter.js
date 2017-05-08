const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Event = require('../models/event');
const UserClass = require('../models/UserClass');
const VehicleClass = require('../models/VehicleClass');


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


// google workshops
router.get('/workshops', isLoggedIn, function (req, res) {
	res.render('workshops', {
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
// maintenance - all events
router.get('/maintenance', isLoggedIn, function (req, res, next) {
	Event.find({}, function (err, events) {
		if (err) {
			console.log(err);
		} else {
			res.render('maintenance', {
				layout: false,
				events: events,
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

// mygarage - all vehicle per user view
router.get('/mygarage', isLoggedIn, function (req, res, next) {
	const id = req.session.user._id;
	Vehicle.find({
		"owner": id
	}, function (err, vehicles) {
		if (err) {
			console.log(err);
		} else if (vehicles.length === 0) {
			console.log('This user has no vehicles, add one first');
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
	const vehicleLicense = req.body.vehicleLicense; // TODO

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
		const newEvent = new Event({
			title,
			description,
			km,
			cost,
			vehicleLicense
		});
		Event.addEvent(newEvent);
		//vehicle.events.push(newEvent._id); // TODO
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
	console.log(user._id);
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
		var mongodb = require('mongodb');
		//getting the mongo client interface to connect witha  mongodb server
		var MongoClient = mongodb.MongoClient;
		//connection url of the database
		var url = 'mongodb://localhost/mygarage';

		MongoClient.connect(url, function (error, db) {

			if (error) {
				console.log("Unable to connect to mongo server ERROR : ", error);
			} else {
				console.log("Connection sucesful to ", url);

				var vehicles = db.collection('vehicles');
				var users = db.collection('users');
				let someVehicle = new VehicleClass(brand, model, license, yearOfManufacture, km);
				console.log(someVehicle);
				vehicles.insert(someVehicle, function (err, result) {
					if (error) {
						console.log("ERROR ", error);
						return;
					} else {
						console.log("SUCCESS INSERTED in to vehicles collection _is are ", result.length, result)
						return;
					}

				});

				users.findOne({
						"_id": user
					},
					function (err, foundUser) {
						console.log(foundUser);
						//foundUser.vehicles.push(someVehicle);
						res.redirect('/mygarage');
						return;
					});

			}
		});
	}

});

// Register
router.post('/', function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	let password = req.body.password;
	const password2 = req.body.password2;

	let some = new UserClass(username, email, password);
	console.log(some);

	// input validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// User.findOne({
	// "username": username,
	// "email": email
	// }).then(user => {
	// if (user) {
	// console.log('User exists!');
	// return;
	// } else {
	// const errors = req.validationErrors();
	// if (errors) {
	// console.log(errors);
	// return;
	// } else {
	// const newUser = new User({
	// email: email,
	// username: username,
	// password: password
	// });
	// User.createUser(newUser);
	// console.log("Registered successfully!");
	// res.redirect('/');
	// return;
	// }
	// }
	// });
	// return;

	var mongodb = require('mongodb');
	//getting the mongo client interface to connect witha  mongodb server
	var MongoClient = mongodb.MongoClient;
	//connection url of the database
	var url = 'mongodb://localhost/mygarage';

	MongoClient.connect(url, function (error, db) {

		if (error) {
			console.log("Unable to connect to mongo server ERROR : ", error);
		} else {
			console.log("Connection sucesful to ", url);

			var collection = db.collection('users');
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					password = hash;
					let some = new UserClass(username, email, password);
					console.log(some);
					collection.insert(some, function (err, result) {
						if (error) {
							console.log("ERROR ", error);
							return;
						} else {
							console.log("SUCCESS INSERTED in to users collection _is are ", result.length, result)
							console.log("Registered successfully!");
							res.redirect('/');
							return;
						}
					});
				});
			});

		}
	})



});

// Login
router.post('/mygarage', function (req, res) {
	const loginParams = req.body;
	const username = req.body.username;
	const password = req.body.password;

	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'model is required').notEmpty();

	const errors = req.validationErrors();

	var mongodb = require('mongodb');
	//getting the mongo client interface to connect witha  mongodb server
	var MongoClient = mongodb.MongoClient;
	//connection url of the database
	var url = 'mongodb://localhost/mygarage';

	MongoClient.connect(url, function (error, db) {

		if (error) {
			console.log("Unable to connect to mongo server ERROR : ", error);
		} else {
			var collection = db.collection('users');
			collection.findOne({
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
	})

});

module.exports = router;