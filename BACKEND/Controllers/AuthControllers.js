const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");


const maxAge = 2 * 24 * 60 * 60;

const createToken = (id,accountType,stat) => {
    return jwt.sign({ id,accountType,stat }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
};


const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Password is invalid" || err.message === "Email is invalid") {
        errors.email = "Email/Password is invalid"
    }


    if (err.code === 11000) {
        errors.email = "Email is already exist!";
        return errors;
    }
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;

};


module.exports.regist = async (req, res, next) => { };

module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const status = 0;
        const accountType = "student";
        const user = await UserModel.create({ email, password, accountType, status });
        res.status(201).json({ user: user._id, created: true });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id,user.accountType,user.status);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(200).json({ user: user._id, created: true });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};

module.exports.getUser = async (req, res, next) => {
    try {
        const users = await UserModel.find({ accountType: 'student' });
  res.status(200).json({ success: true, users });
        
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};

