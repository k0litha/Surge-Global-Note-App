const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
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
    accountType: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Birth date is required"],
    }

    
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.pre("findOneAndUpdate", async function(next){
    const salt = await bcrypt.genSalt();
    this._update.password = await bcrypt.hash(this._update.password, salt);
    next();
});

userSchema.statics.login = async function (email, password){
    const user =await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error("Password is invalid")
    }
    throw Error("Email is invalid")
};

module.exports = mongoose.model("User",userSchema);