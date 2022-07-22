const mongoose =require("mongoose");

const userSchema =new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

});

module.exports = mongoose.model("Users",userSchema);