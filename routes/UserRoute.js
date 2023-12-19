const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUser
} = require("../controllers/UserController")

router.route("/").get(getAllUser);
router.route("/createuser").post(createUser)

module.exports = router;