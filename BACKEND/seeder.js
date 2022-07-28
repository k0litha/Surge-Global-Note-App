const mongoose = require("mongoose");
const User = require("./Models/UserModel");
const Note = require("./Models/NoteModel");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connection Success")
    })
    .catch(() => {
        console.log(err.message);
    });

const seedUsers = [
    {
        email: "admin@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS", // Email='admin@gmail.com' Password='admin'
        accountType: "admin",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },

    {
        email: "student@gmail.com",
        password: "$2b$10$Gj9dzs85Qw1qtvPDW7qBe.GZn1DyUhOIRriLokco5Xo.r1ZKMYS0u", // Email='student@gmail.com' Password='student'
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "tempstudent@gmail.com",
        password: "$2b$10$Gj9dzs85Qw1qtvPDW7qBe.GZn1DyUhOIRriLokco5Xo.r1ZKMYS0u", // (not activated yet)Email='tempstudent@gmail.com' Password='student'
        accountType: "student",
        status: false,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "john@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "mark@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Kolitha",
        lastName: "Senevirathne"
    },
    {
        email: "ann@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Ann",
        lastName: "Jane"
    },
    {
        email: "marry@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "Marry",
        lastName: "Fernando"
    },
    {
        email: "kate@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "kate",
        lastName: "Nickelson"
    },
    {
        email: "don@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "don",
        lastName: "john"
    },
    {
        email: "tom@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "tom",
        lastName: "perry"
    },
    {
        email: "pete@gmail.com",
        password: "$2b$10$C64d4.mXuqJaESpkliJ2n.WYKro6amJplEoCdisevJSC2OIiDFlPS",
        accountType: "student",
        status: true,
        phone: "0771234567",
        dateOfBirth: new Date(),
        firstName: "pete",
        lastName: "mark"
    }

];


const seedDB = async () => {
    await User.deleteMany({});
    await Note.deleteMany({});
    await User.insertMany(seedUsers);
};
console.log("Seeds inserted successfully")

seedDB().then(() => {
    mongoose.connection.close();
});
