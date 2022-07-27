const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const maxAge = process.env.JWT_AGE;

// JWT token creation function
const createToken = (id, accountType, email, stat) => {
    return jwt.sign({ id, accountType, email, stat }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
};


//handling returned errors from db
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


//generate random password for newly created user
function passwordGen() {
    const generator = require('generate-password');
    const password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true
    });;
    return password;
};



//mail sender
function sendmail(email, password) {
    const nodemailer = require("nodemailer");
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: '"Note Service" <note@surgeglobal.com>',
        to: email,
        subject: 'Note Service Login',
        text: `Email: ${email} | password: ${password} | Login Link: http://localhost:3000/`,
    };
    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}


//user creation handling
module.exports.createUser = async (req, res) => {
    try {
        const password = passwordGen();
        const { email } = req.body;
        const user = await UserModel.create({ email, password });
        res.status(201).json({ user: user._id, created: true });
        sendmail(email, password);
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};




//user login handling
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, user.accountType, user.email, user.status);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ user: user._id, login: true });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, login: false });
    }
};



//user fetching handling
module.exports.getAllUser = async (req, res) => {
    try {
        const { page } = req.params;
        var newpage = page;
        const size = process.env.USERS_PER_PAGE;
        const totalRows = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalRows / size)

        if (!totalPages) {
            newpage = 1;
        }
        else if (page > totalPages) {
            newpage = totalPages;
        }
        if (page < 1) {
            newpage = 1;
        }
        const skip = (newpage - 1) * size;

        const users = await UserModel
            .find({ accountType: 'student' })
            .select('-password')
            .sort({"_id":-1})
            .skip(skip)
            .limit(size);
        res.status(200).json({ pages: { totalPages: totalPages, currentPage: newpage }, users: users });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};



//user search handling
module.exports.userSearch = async (req, res) => {
    try {
        const { item } = req.params;
        const users = await UserModel
            .find({
                accountType: 'student',
                email: new RegExp(item, 'i')
            })
            .select('-password')
        res.status(200).json({ users: users });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};




//user registration   handling
exports.userUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdated = await UserModel.findOneAndUpdate({ _id: id }, req.body, {
            upsert: true,
        });
        res.status(200).json({ success: true, userUpdated });
    } catch {
        console.log(error);
    }
};


//user logout handling
exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    res.redirect('http://localhost:3000/');
};
