const { login, register } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();



router.post("/admin",register);

router.post("/",checkUser);
router.post("/userreg",checkUser);

router.post("/login",login);
router.post("/register",checkUser,register);


module.exports =router;