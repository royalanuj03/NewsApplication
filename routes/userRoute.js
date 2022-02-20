const express = require("express");
const router = express.Router();
const { register, authuser, getUserprofile, updateuserprofile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.route("/")
    .post(register);


router.route("/login")
    .post(authuser)

router.route("/profile")
    .get(protect, getUserprofile).put(protect, updateuserprofile)



module.exports = router;
