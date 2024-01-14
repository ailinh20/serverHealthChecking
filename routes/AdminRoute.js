const express = require("express");
const router = express.Router();

const {
    getAllAdmin,
    getAdmin,
    updateAdmin
} = require("../controllers/AdminController")

router.route("/").get(getAllAdmin);
router.route("/getadmin").get(getAdmin);
router.route("/updateadmin").put(updateAdmin);

module.exports = router;