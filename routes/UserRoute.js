const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUser,
    getUser
} = require("../controllers/UserController")

router.route("/").get(getAllUser);
router.route("/createuser").post(createUser);
router.route("/getuser/:id").get(getUser)

module.exports = router;