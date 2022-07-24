const express = require("express");
require('dotenv').config();
const cors = require("cors");
const mongoose =require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser =require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();





app.listen(4000,()=>{
    console.log("port 4000 server started")
});

mongoose.connect("mongodb://localhost:27017/noteDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (()=>{
    console.log("Connection Success")
})
.catch (()=>{
    console.log(err.message);
});

app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/",authRoutes);