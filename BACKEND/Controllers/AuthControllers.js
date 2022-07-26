const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = process.env.JWT_AGE;

const createToken = (id, accountType, stat) => {
    return jwt.sign({ id, accountType, stat }, process.env.JWT_KEY, {
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



function passwordGen() {
    const generator = require('generate-password');
    const password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true
    });;
    return password;
}



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


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, user.accountType, user.status);
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




module.exports.getAllUser = async (req, res) => {
    try {
        const { page } = req.params;
        var newpage = page;
        const size = 8;
        const totalRows = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalRows / size)

        if (page > totalPages) {
            newpage = totalPages;
        }
        if (page < 1) {
            newpage = 1;
        }

        const skip = (newpage - 1) * size;



        const users = await UserModel
            .find({ accountType: 'student' })
            .select('-password')
            .skip(skip)
            .limit(size);

        res.status(200).json({ pages: { totalPages: totalPages, currentPage: newpage }, users: users });

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};




module.exports.getUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserModel
            .find({ _id: uid })
            .select('-password')
           
        res.status(200).json({ user: user });

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};








exports.userUpdate = async (req, res) => {
    const { id } = req.params;
    //const user = await UserModel.findOne({ _id: id });
    //  if (!user)
    //  console.log("no user")

    const userUpdated = await UserModel.findOneAndUpdate({ _id: id }, req.body, {
        upsert: true,
    });
    res.status(200).json({ success: true, userUpdated });

};
exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    res.redirect('http://localhost:3000/');
};
