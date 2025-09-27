const express = require('express')
const router = express.Router();
const { handleUserSignUp, handleUserLogin } = require('../controllers/user')

router.get("/register", (req, res) => {
    res.render("signup");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogin);
module.exports = router; 

