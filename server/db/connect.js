const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chatApp").then(() => {console.log("connected to db")}).catch(() => {console.log("An error occured while connecting to db")})
