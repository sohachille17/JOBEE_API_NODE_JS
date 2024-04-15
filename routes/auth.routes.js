const express = require("express");
const router = express.Router()
const { 

    createUser,
    loginUser

 }  = require("../controllers/auth.controller");





/* Register a new user with 'register' -> route from auth controller */
router.route("/register").post(createUser);
router.route("/login").post(loginUser);


// routes here
module.exports = router;