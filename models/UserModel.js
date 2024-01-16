var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModel = new Schema({
    name: {
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
    username: {
        type:String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    dayOfBirth: {
		type: String,
    },
    idDevice: {
        type: String,
        ref: "SensorModel"
    },
    UrlImg: {
        type: String
    },
    status: {
        type: Number
    },
    gender: {
        type: String
    }
})

module.exports = mongoose.model("UserModel", UserModel)