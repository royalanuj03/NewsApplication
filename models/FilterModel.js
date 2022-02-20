const mongoose = require("mongoose");

const filterSchema =  mongoose.Schema({
    filter_name: String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Filter",filterSchema);