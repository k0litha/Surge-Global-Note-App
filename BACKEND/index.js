const express = require("express");
require('dotenv').config();
const cors = require("cors");
const mongoose =require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const noteRoutes = require("./Routes/NoteRoutes");
const app = express();
const cookieParser =require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();




app.listen(process.env.SERVER_PORT,()=>{
    console.log("port 4000 server started")
});

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (()=>{
    console.log("Connection Success")
})
.catch ((e)=>{
    console.log(e.message);
});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET","POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/",authRoutes);
app.use("/",noteRoutes);