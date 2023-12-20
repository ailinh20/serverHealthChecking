const asyncHandler = require("../middlewares/async")

const AdminModel = require("../models/AdminModel");

//Get admin
exports.getAdmin = asyncHandler(async (req, res, next) => {
    let admin;
    try {
        admin = await AdminModel.findOne({ userName: "admin" });
        if (admin == null) {
            return res.status(404).json({ success: false, message: 'Không thể tìm thấy người dùng' });
        } else {
            res.status(200).json({
                success: true,
                data: admin
            });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Không thể tìm thấy người dùng' });
    } 
});

//Update admin
exports.updateAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        admin = await AdminModel.findOne({ userName: "admin" });

        if (admin) {
            await AdminModel.updateOne({ _id: admin._id }, { $set: updateFields });
            const updatedUser = await AdminModel.findById(admin._id);
            res.status(200).json({ success: true, data: updatedUser });
        } else {
            return res.status(404).json({ success: false, message: 'Không thể tìm thấy người dùng' });
        }
        
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

//Get all user
exports.getAllAdmin = asyncHandler(async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



