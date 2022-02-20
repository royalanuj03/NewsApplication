const express = require("express");
const { addFilter, deletefilter, getAllFilter, editfilter } = require("../controllers/filterController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.route("/addFilter")
    .post(protect, addFilter)

router.route("/deletefilter/:filId")
    .delete(protect, deletefilter)

router.route("/getAllFilter")
    .get(getAllFilter)

router.route("/editfilter/:filId")
    .put(protect, editfilter)

module.exports = router;