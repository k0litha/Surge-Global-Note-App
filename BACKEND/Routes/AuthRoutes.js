const { login, createUser, getAllUser, userUpdate,logout,userSearch } = require("../Controllers/AuthControllers");
const { checkUser,checkAdmin} = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.get("/allusers/:page",checkAdmin,getAllUser);
router.get("/usersearch/:item",checkAdmin,userSearch);
router.post("/userReg/:id",checkUser,userUpdate);
router.get("/logout",checkUser,logout);
router.post("/login",login);
router.post("/createuser",checkAdmin,createUser );






module.exports =router;