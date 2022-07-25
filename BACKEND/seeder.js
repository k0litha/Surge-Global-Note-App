const mongoose =require("mongoose");
const User = require("./Models/UserModel");
const bcrypt = require("bcrypt");

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

const seedUsers=[
    {
        email: "admin@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "admin",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstname: "Kolitha",
        lastname: "Senevirathne"
    }


];

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
};
console.log("Seeds inserted successfully")

seedDB().then(() =>{
    mongoose.connection.close();
});
