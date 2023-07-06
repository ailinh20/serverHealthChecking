const express = require('express');
const infoSensor = require('../models/model.js');

const router = express.Router()
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