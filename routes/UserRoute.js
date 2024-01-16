const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/UserController")

router.route("/").get(getAllUser);
router.route("/createuser").post(createUser);
router.route("/getuser/:id").get(getUser);
router.route("/updateuser/:id").put(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);

module.exports = router;