const mongoose = require('mongoose');

const infoSensor = new mongoose.Schema({
    heartbeat: {
        required: true,
        type: Number
    },
    sp02: {
        required: true,
        type: Number
    },
    timing: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("infoSensor", infoSensor)