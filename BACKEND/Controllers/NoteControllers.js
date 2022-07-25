const UserModel = require("../Models/NoteModel");


const handleErrors = (err) => {
    let errors = { title: "" , description:""};

   
    if (err.message.includes("Note validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;

};




module.exports.createNote = async (req, res) => {

    try {

        const { title,description,date,userid } = req.body;
        const note = await UserModel.create({ title,description,date,userid });
        res.status(201).json({ note: note._id, created: true });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });

    }
};





module.exports.getAllNote = async (req, res) => {
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
