const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const EventSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    km: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    vehicleLicense: {
        type: String, //
        ref: 'Vehicle',
        lowercase: true,
        trim: true
    }
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.addEvent = function (newEvent, callback) {
    newEvent.save(callback);
};

module.exports.getEventById = function (id, callback) {
    Event.findById(id, callback);
}

module.exports.editEvent = function (id, callback) {
    Event.findOneAndUpdate(id, callback);
}

module.exports.deleteEvent = function (id, callback) {
    Event.findByIdAndRemove(id, callback);
}