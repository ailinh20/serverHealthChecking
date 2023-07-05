require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const Model = require('./models/AI.js');
const infoSensor = require('./models/model.js');

const socketIO = require('socket.io');
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

// MQTT
const host = 'broker.emqx.io';
const port = '1883';
const clientId = 'mqttx_c7788f64';//`mqtt_${Math.random().toString(16).slice(3)}`;

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

app.get('/', async (req, res) => {
    const data = await infoSensor.find();
    // Tạo một đối tượng Model
    res.render('home', { data: data });
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
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Tạo kết nối WebSocket
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('A client connected');

    // Gửi dữ liệu ban đầu khi có kết nối mới
    infoSensor.find().then((data) => {
        socket.emit('data-update', data);
    });

    // Lắng nghe sự thay đổi trong MongoDB và gửi cập nhật tới tất cả các kết nối WebSocket
    const changeStream = infoSensor.watch();
    changeStream.on('change', (change) => {
        infoSensor.find().then((data) => {
            io.emit('data-update', data);
        });
    });

    // Xử lý khi kết nối WebSocket bị đóng
    socket.on('disconnect', () => {
        console.log('A client disconnected');
        changeStream.close();
    });
});
