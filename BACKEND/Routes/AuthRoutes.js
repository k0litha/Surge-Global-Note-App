const { login, createUser, getAllUser, userUpdate,logout,userSearch } = require("../Controllers/AuthControllers");
const { checkUser,checkAdmin} = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();


//get all users with backend pagination
router.get("/allusers/:page",checkAdmin,getAllUser);

//search a user by eamil
router.get("/usersearch/:item",checkAdmin,userSearch);

//user registraion
router.post("/userReg/:id",checkUser,userUpdate);

//user logout
router.get("/logout",checkUser,logout);

//user login
router.post("/login",login);

//create new user
router.post("/createuser",checkAdmin,createUser );



module.exports =router;