const { getAllNote, createNote } = require("../Controllers/NoteControllers");
const { checkStudent } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.post("/allnotes",checkStudent,getAllNote);
router.post("/createnote",checkStudent,createNote );








module.exports =router;