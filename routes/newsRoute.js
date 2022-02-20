const express = require("express");
const { addNews,getallNews } = require("../controllers/newsController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.route("/addNews")
.post(protect,addNews)

router.route("/getallNews")
.get(getallNews)

module.exports = router;