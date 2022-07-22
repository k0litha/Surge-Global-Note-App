const express = require("express");
const cors = require("cors");
const mongoose =require("mongoose");

const app = express();


app.listen(400,()=>{
    console.log("port 4000 server started")
});

mongoose.connect("mongodb://localhost:27017/note",{
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