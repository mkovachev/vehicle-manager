// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

//Vehicle Schema
// const VehicleSchema = mongoose.Schema({
    // vehicleType: {
        // type: String
    // },
    // brand: {
        // type: String,
        // require: true
    // },
    // model: {
        // type: String,
        // require: true
    // },
    // license: {
        // type: String,
        // unique: true
    // },
    // yearOfManufacture: {
        // type: String,
    // },
    // km: {
        // type: Number
    // },
    // owner: {
        // type: Schema.ObjectId,
        // ref: 'User',
        // unique: true,
        // lowercase: true,
        // trim: true
    // },
    // events: {
        // type: String
    // }
// });

// const Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema);

// module.exports.addVehicle = function (newVehicle, callback) {
    // newVehicle.save(callback);
// };

// module.exports.getVehicleById = function (id, callback) {
    // Vehicle.findById(id, callback);
// }

// module.exports.getFleet = function (username, callback) {
    // Vehicle.find(username, callback);
// }

// module.exports.editVehicle = function (id, callback) {
    // Vehicle.findOneAndUpdate(id, callback);
// }

// module.exports.deleteVehicle = function (id, callback) {
    // Vehicle.findByIdAndRemove(id, callback);
// }