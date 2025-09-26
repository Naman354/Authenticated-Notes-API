const {v4: uuidv4} = require ('uuid');
const user = require('../models/structure');
const {setUser} = require('../service/auth');
async function handleUserSignUp(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    await user.create({ username, email, password });
    return res.redirect("/user/login");
  } catch (err) {
      if (err.code === 11000) { // duplicate key error
    return res.status(400).send("Username already exists. Choose another.");
  }
  console.error(err);
    res.status(500).send("Error signing up ");
  }
}
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email, password });
    if (!User)
        return res.render("login", {
            error:"Invalid Email or Password"
    });

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}
catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
}

module.exports ={ handleUserSignUp, handleUserLogin };