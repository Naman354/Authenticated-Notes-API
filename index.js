const express = require('express');
const app = express();
const path = require("path");
const userRoute = require('./routes/Routes');
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly} = require('./middleware/autho')
const notesRoutes = require('./routes/routes2');

const PORT=5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 

const db = require("./config/database");
db();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));  

const Note = require('./models/structure');

app.get("/", restrictToLoggedInUserOnly, async (req, res) => {
  try {
    // Fetch all notes for the logged-in user
    const notes = await Note.find({ createdBy: req.user._id });
    
    // Render homepage and pass notes and user info
    return res.render("home", { user: req.user, notes });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error loading notes");
  }
});


app.use("/user", userRoute);
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})