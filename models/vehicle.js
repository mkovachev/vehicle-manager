const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// vehicle schema
const VehicleSchema = mongoose.Schema({
    vehicleType: {
        type: String
    },
    brand: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    license: {
        type: String
    },
    yearOfManufacture: {
        type: String,
    },
    km: {
        type: Number
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        ref: 'User'
    }
});

const Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema);

module.exports.addVehicle = function (newVehicle, callback) {
    newVehicle.save(callback);
};

module.exports.getVehicleById = function (id, callback) {
    Vehicle.findById(id, callback);
}

module.exports.getAllUserVehicle = function (id, callback) {
    Vehicle.find(id, callback).pretty();
}