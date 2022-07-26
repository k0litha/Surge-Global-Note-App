const { login, createUser, getAllUser, userUpdate,logout,getUser } = require("../Controllers/AuthControllers");
const { checkUser,checkAdmin,checkStudent } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.get("/allusers/:page",checkAdmin,getAllUser);
router.get("/getuser/:uid",checkAdmin,getUser);
router.post("/userReg/:id",checkUser,userUpdate);
router.get("/logout",logout);
router.post("/login",login);
router.post("/createuser",checkUser,createUser );






module.exports =router;