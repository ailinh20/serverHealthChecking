require('dotenv').config();
require("colors");
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const infoSensor = require('./models/model.js');
const DBConnection = require("./config/db");

DBConnection();

const app = express();

app.use(express.json());
app.use('/api', routes);
app.set('view engine', 'ejs'); // Sử dụng ejs làm view engine


app.get('/', async (req, res) => {
    const data = await infoSensor.find();
    //var infor = JSON.parse(data);
    res.render('home', {data: data});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan)
});