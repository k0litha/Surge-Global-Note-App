const { getAllNote, createNote,updateNote,deleteNote } = require("../Controllers/NoteControllers");
const { checkStudent } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.get("/allnotes/:uid/:page",checkStudent,getAllNote);
router.get("/deletenote/:nid",checkStudent,deleteNote);

router.post("/updatenote/:nid",checkStudent,updateNote);
router.post("/createnote",checkStudent,createNote );









module.exports =router;