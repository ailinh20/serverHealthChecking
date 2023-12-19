const asyncHandler = require("../middlewares/async")

const UserModel = require("../models/UserModel");

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
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

