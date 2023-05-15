require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const infoSensor = require('./models/model.js');

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

const app = express()
app.use(express.json());
app.use('/api', routes);
app.set('view engine', 'ejs'); // Sử dụng ejs làm view engine

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/', async (req, res) => {
    const data = await infoSensor.findById("64613eb13e584d497ad170a7");
    //var infor = JSON.parse(data);
    res.render('home', {data: data});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});