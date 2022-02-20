const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    newsImage:String,
    title:String,
    content:String,
    author:String,
    url:String,
    filter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Filter"
    },
    addedAt:{
        type:Date
    }
})

module.exports = mongoose.model("News",newsSchema);