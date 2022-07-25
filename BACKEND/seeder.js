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
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // password= admin
        accountType: "admin",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },

    {
        email: "student@gmail.com",
        password: "$2b$10$Gj9dzs85Qw1qtvPDW7qBe.GZn1DyUhOIRriLokco5Xo.r1ZKMYS0u", // password= student
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student1@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student2@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student3@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student4@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student5@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student6@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "student7@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // admin
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
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
