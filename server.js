const express = require('express');
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const filterRoute = require("./routes/filterRoute");
const formData = require("express-form-data");
const newsRoute = require("./routes/newsRoute");
// logged the requested api because of morgan in this way GET / 200 12.073 ms - 5
const morgan = require("morgan");

connectDB();

require('dotenv').config();
// This is because to show the colour in console.
require('colors');
const app = express();
//  how we are accessing the environment
//  if its in development mode then it will show all the api in log otherwise 
//  it will not show
if (process.env.NODE_DEV === 'development') {
    app.use(morgan('dev'));
}

//  To access the data from the body we need the middleware
//  it will access the json type data from body.
app.use(express.json());
//  To acscess url type data from body.
app.use(express.urlencoded({ extended: false }));

app.use(formData.parse());

app.use("/api/users", userRoute);
app.use("/api/filter", filterRoute);
app.use("/api/news",newsRoute);

app.get("/", function (req, res) {
    console.log(req.body);
    res.send("Hello");
    console.log("Endpoint is woking fine.");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is connected in ${process.env.NODE_DEV} mode on port ${PORT}`.red))