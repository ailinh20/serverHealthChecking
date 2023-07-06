require('dotenv').config();
require("colors");
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const infoSensor = require('./models/model.js');

const mqtt = require('mqtt'); // Thêm dòng này để import thư viện mqtt

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/models'));
app.use(express.json());
app.use('/api', routes);
app.set('view engine', 'ejs'); // Sử dụng ejs làm view engine

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

//Socket io
const http = require('http');
const server = http.createServer(app);
const {Server} = require ('socket.io')
let end = 0;
let currentIndex = 0;
const io = new Server(server)

let sp02Data = [];
let heartbeatData = [];

io.on('connection', (socket) => {
    console.log ("A client connected");
    // Lắng nghe sự kiện 'updateEndCurrent' từ client
    socket.on('updateEndCurrent', (data) => {
        end = data.end;
        currentIndex = data.currentIndex;

        let startIndex = currentIndex;
        let endIndex = end;
    
        let selectedSp02Data = sp02Data.slice(startIndex, endIndex + 1);
        let selectedHeartbeatData = heartbeatData.slice(startIndex, endIndex + 1);
    
        let sp02Average = calculateAverage(selectedSp02Data);
        let heartbeatAverage = calculateAverage(selectedHeartbeatData);
        console.log("Data of 5 times in a row\n".yellow+"SpO2 Average : ".blue+ sp02Average+"\nHeartbeat Average : ".blue+ heartbeatAverage);
        let prediction = predict('25', sp02Average, heartbeatAverage);
        console.log("P : ".green + prediction);
        io.emit('prediction',{prediction});
            
    });
});

// MQTT
const host = 'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
});

const topic = '/CE232_PUB';

client.on('connect', () => {
    console.log('MQTT Connected');

    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
    });
});

client.on('message', (topic, message) => {
    //message is a Buffer
    let strMessage = message.toString();
    let objMessage = JSON.parse(strMessage);
    console.log(objMessage);
    const data = new infoSensor({
      age: "25",
      sp02: objMessage.sp02,
      heartbeat: objMessage.heartbeat,
      timing: objMessage.timing
  })
    data.save()
        .then(() => {
            console.log('Message saved to MongoDB');
        })
        .catch((error) => {
            console.error(error);
        });

})
function calculateAverage(data) {
    const sum = data.reduce((total, value) => total + value, 0);
    const average = sum / data.length;
    return average;
}
let predict = (in1, in2, in3) => {
    const coefficients = [0.0660209726519282, 0.12359479564440112, -0.9142408558355729];
    const intercept = 73.3259513211596;
  
    let prediction = intercept;
    prediction += coefficients[0] * in1;
    prediction += coefficients[1] * in2;
    prediction += coefficients[2] * in3;
    let P = 1 / (1 + Math.exp(-prediction));
    return P;
  };
app.get('/', async (req, res) => {
    try{
        const data = await infoSensor.find().exec();
        sp02Data = data.map(item => item.sp02);
        heartbeatData = data.map(item => item.heartbeat);
           
          res.render('home', { data });
        } catch (error) {
          console.error('Error retrieving data from MongoDB:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
        
app.delete('/api/deleteall', async (req, res) => {
    try {
        await infoSensor.deleteMany({});
        res.status(200).json({ message: 'Dữ liệu đã được xóa thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa dữ liệu' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

