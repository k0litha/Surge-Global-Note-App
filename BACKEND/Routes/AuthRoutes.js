const { admin, login } = require("../Controllers/AuthControllers");

const router = require("express").Router();

router.post("");
router.post("/admin",admin)
router.post("/",login)

module.exports =router;