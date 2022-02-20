const mongoose = require("mongoose");
const db_link = "mongodb+srv://admin:yCPFuCsBrNwNQfIe@cluster0.gi5jt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectDB = async () => {
    const conn = await mongoose.connect(db_link)
    console.log(`Database connected ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;