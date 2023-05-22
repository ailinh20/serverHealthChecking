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
    year: {
        required: true,
        type: Number
    },
    month: {
        required: true,
        type: Number
    },
    day: {
        required: true,
        type: Number
    },
    time: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("infoSensor", infoSensor)