const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/mygarage';

const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Event = require('../models/Event');


function displayItems(foundItemsCollection, err, callback) {
	let foundItems = [];

	foundItemsCollection.forEach(function (item) {
		if (item != null) {
			foundItems.push(item);
		} else {
			//foundVehiclesCollection.toArray();
		}
	});
	setTimeout(function () {
		callback(foundItems);
	}, 250)
}

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

//------------------------- VIEWs ---------------
// maintenance - all events
router.get('/maintenance', isLoggedIn, function (req, res, next) {
	const id = req.session.user._id;
	const user = req.session.user;
	const UserID = ObjectId(id)
	MongoClient.connect(url, function (error, db) {

		const eventsCollection = db.collection('events');

		eventsCollection.find({
			userID: UserID
		}, function (err, foundEventsCollection) {
			if (err) {
				console.log(err);
				req.flash('error_msg', err);
				return;
			} else {
				displayItems(foundEventsCollection, err, function (foundItems) {

					console.log(foundItems);

					if (err) {
						console.log(err);
						req.flash('error_msg', err);
					} else if (foundEventsCollection.length === 0) {
						console.log('This user has no events, add one first');
						req.flash('error_msg', 'This user has no events, add one now');
						res.redirect('addevents');
						return;
					} else {
						res.render('maintenance', {
							layout: false,
							events: foundItems,

						});

						return;

					}

				})
			}
		})
	});
});

// mygarage - all vehicle per user view
router.get('/mygarage', isLoggedIn, function (req, res, next) {
	const id = req.session.user._id;
	const user = req.session.user;
	const UserID = ObjectId(id)
	MongoClient.connect(url, function (error, db) {

		if (error) {
			console.log("Unable to connect to mongo server ERROR : ", error);
		} else {
			const vehicles = db.collection('vehicles');

			vehicles.find({
					ownerID: UserID
				},
				function (err, foundVehiclesCollection) {

					displayItems(foundVehiclesCollection, err, function (foundItems) {

						console.log(foundItems);

						if (err) {
							console.log(err);
							req.flash('error_msg', err);
						} else if (foundVehiclesCollection.length === 0) {
							console.log('This user has no vehicles, add one now');
							req.flash('error_msg', 'This user has no vehicles, add one now');
							res.redirect('addvehicle');
							return;
						} else {
							res.render('mygarage', {
								layout: false,
								vehicles: foundItems,

							});

							return;

						}

					})

				});
		}
	});
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
	const id = req.session.user._id;
	const user = req.session.user;
	const UserID = ObjectId(id)

	// input validation
	req.checkBody('title', 'title is required').notEmpty();
	req.checkBody('description', 'description is required').notEmpty();
	req.checkBody('km', 'km is required').notEmpty();
	req.checkBody('cost', 'cost is required').notEmpty();
	req.checkBody('vehicleLicense', 'vehicleLicense is required').notEmpty();

	const errors = req.validationErrors();
	MongoClient.connect(url, function (error, db) {
		if (errors) {
			console.log(errors);
			req.flash('error_msg', errors);
			return;
		} else {
			const newEvent = new Event(
				title,
				description,
				km,
				cost,
				vehicleLicense,
				UserID

			);

			const eventsCollection = db.collection('events')
			eventsCollection.insertOne(newEvent, function (err, addedEvent) {

				if (err) {
					console.log(err);
					req.flash('error_msg', err);
					return;
				} else {
					console.log(addedEvent);
					req.flash('success_msg', addedEvent);
					return;
				}
			})
			res.redirect('/maintenance');
			return;
		}
	})
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

	MongoClient.connect(url, function (error, db) {

		if (error) {
			console.log("Unable to connect to mongo server ERROR : ", error);
		} else {

			console.log("Connection successful to ", url);
			const userID = ObjectId(user._id);
			const vehiclesCollection = db.collection('vehicles');
			const users = db.collection('users');
			let newVehicle = new Vehicle(brand, model, license, yearOfManufacture, km, userID);

			console.log(newVehicle);

			vehiclesCollection.insert(newVehicle, function (err, result) {
				if (err) {
					console.log("ERROR ", err);
					req.flash('error_msg', err);
					return;
				} else {
					console.log("SUCCESS INSERTED in to vehicles collection _is are ", result);
					req.flash('success_msg', result);
					res.redirect('/mygarage');
					return;
				}

			});

		}
	});
});

// Register
router.post('/', function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	let password = req.body.password;
	const password2 = req.body.password2;

	let some = new User(username, email, password);
	console.log(some);

	// input validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	MongoClient.connect(url, function (error, db) {

		if (error) {
			console.log("Unable to connect to mongo server ERROR : ", error);
		} else {
			console.log("Connection successful to ", url);

			var collection = db.collection('users');
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(password, salt, function (err, hash) {
					password = hash;
					let some = new User(username, email, password);
					console.log(some);
					collection.insert(some, function (err, result) {
						if (error) {
							console.log("ERROR ", error);
							req.flash('error_msg', err);
							return;
						} else {
							console.log("SUCCESS INSERTED in to users collection _is are ", result.length, result)
							console.log('Registered successfully!');
							req.flash('success_msg', 'Registered successfully!');
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
					req.flash('error_msg', err);
					return;
				}
				if (!user || user === null) {
					console.log('This user does not exist yet, please register first');
					req.flash('error_msg', 'This user does not exist yet, please register first');
					res.redirect('/');
					return;
				}

				bcrypt.compare(loginParams.password, user.password, function (err, success) {
					if (err) {
						console.log('Password is incorrect!');
						req.flash('error_msg', 'Password is incorrect!');
						res.redirect('/');
						return;
					}

					if (success) {
						req.session.user = user;
						res.redirect('/mygarage');
						console.log('Logged in successfully!');
						req.flash('success_msg', 'Logged in successfully!');
						return;
					}
				});
			});
		}
	})

});

module.exports = router;