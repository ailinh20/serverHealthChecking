const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUser,
    getUser,
    updateUser
} = require("../controllers/UserController")

router.route("/").get(getAllUser);
router.route("/createuser").post(createUser);
router.route("/getuser/:id").get(getUser);
router.route("/updateuser/:id").put(updateUser);

module.exports = router;