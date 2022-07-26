const { getAllNote, createNote,updateNote,deleteNote } = require("../Controllers/NoteControllers");
const { checkStudent } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();


//get all note with back end pagination
router.get("/allnotes/:uid/:page",checkStudent,getAllNote);

//delete a note
router.get("/deletenote/:nid",checkStudent,deleteNote);

//update a note
router.post("/updatenote/:nid",checkStudent,updateNote);

//create a note
router.post("/createnote",checkStudent,createNote );









module.exports =router;