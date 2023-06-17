const mongoose = require('mongoose');

const infoSensor = new mongoose.Schema({
    age: {
        type: Number
    },
    heartbeat: {
        type: Number
    },
    sp02: {
        type: Number
    },
    timing: {
        type: String
    }
})

module.exports = mongoose.model("infoSensor", infoSensor)