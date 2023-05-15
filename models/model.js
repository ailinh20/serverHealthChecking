const mongoose = require('mongoose');

const infoSensor = new mongoose.Schema({
    temp: {
        required: true,
        type: Number
    },
    heartbeat: {
        required: true,
        type: Number
    },
    sp02: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model("infoSensor", infoSensor)