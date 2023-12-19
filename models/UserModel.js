var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModel = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    dayOfBirth: {
		type: Date,
        required: true
    },
    idDevice: {
        type: String,
        ref: "SensorModel"
    }
})

module.exports = mongoose.model("UserModel", UserModel)