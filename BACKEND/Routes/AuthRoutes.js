const { login, createUser, getAllUser, userUpdate,logout } = require("../Controllers/AuthControllers");
const { checkUser,checkAdmin } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.get("/allusers/:page",checkAdmin,getAllUser);

router.post("/userReg/:id",checkUser,userUpdate);
router.get("/logout",logout);
router.post("/login",login);
router.post("/createuser",checkUser,createUser );


module.exports =router;