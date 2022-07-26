const NoteModel = require("../Models/NoteModel");


const handleErrors = (err) => {
    let errors = { title: "", description: "" };


    if (err.message.includes("Note validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;

};




module.exports.createNote = async (req, res) => {

    try {

        const { title, description, date, userid } = req.body;
        const note = await NoteModel.create({ title, description, date, userid });
        res.status(201).json({ note: note._id, created: true });
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });

    }
};





module.exports.getAllNote = async (req, res) => {
    try {
        const { uid, page } = req.params;
        var newpage = page;
        const size = 8;
        const totalRows = await NoteModel.countDocuments();
        const totalPages = Math.ceil(totalRows / size)

        if (page > totalPages) {
            newpage = totalPages;
        }
        if (page < 1) {
            newpage = 1;
        }

        const skip = (newpage - 1) * size;



        const notes = await NoteModel
            .find({ userid: uid })
            .select('-password')
            .skip(skip)
            .limit(size);

        res.status(200).json({ pages: { totalPages: totalPages, currentPage: newpage }, notes: notes });

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};


exports.updateNote = async (req, res) => {
    try {
        const { nid } = req.params;
        const noteUpdated = await NoteModel.findOneAndUpdate({ _id: nid }, req.body, {
            upsert: true,
        });
        res.status(200).json({ success: true, noteUpdated });
    } catch(error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, updated: false });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { nid } = req.params;
        const noteDeleted = await NoteModel.findOneAndDelete({ _id: nid });
        res.status(200).json({ success: true, noteDeleted });
    } catch(error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, noteDeleted: false });
    }
};