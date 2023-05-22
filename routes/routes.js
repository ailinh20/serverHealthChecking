const express = require('express');
const infoSensor = require('../models/model.js');

const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    const data = new infoSensor({
        temp: req.body.temp,
        sp02: req.body.sp02,
        heartbeat: req.body.heartbeat,
        hour:req.body.hour
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/', async (req, res) => {
    try{
        const data = await infoSensor.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await infoSensor.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await infoSensor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await infoSensor.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.delete('/deleteall', async (req, res) => {
    try {
      // Xóa tất cả các tài liệu trong bộ sưu tập
      await infoSensor.deleteMany({});
      res.status(200).json({ message: 'Dữ liệu đã được xóa thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa dữ liệu' });
    }
  });
  
module.exports = router;