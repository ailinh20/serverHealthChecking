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
    }
})

module.exports = mongoose.model("UserModel", UserModel)