var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminModel = new Schema({
    name: {
        type: String,
    },
    hospital: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    pass: {
        type: String,
        required: true
    },
    dayOfBirth: {
		type: Date,
    },
    userName: {
        type: String,
    },
    gender: {
        type: String
    },
    male: {
        type: Boolean
    },
    female: {
        type: Boolean
    },
    city: {
        type: String,
    },
    country: {
        type: String
    }
})

module.exports = mongoose.model("AdminModel", AdminModel)