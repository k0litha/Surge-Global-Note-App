const { login, createUser, getAllUser, userUpdate } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.get("/allusers",checkUser,getAllUser);

router.post("/userReg/:id",checkUser,userUpdate);

router.post("/login",login);
router.post("/createuser",checkUser,createUser );


module.exports =router;