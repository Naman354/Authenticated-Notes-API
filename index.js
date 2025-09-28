require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/Routes");
const routes2 = require("./routes/routes2"); // notes routes
const { restrictToLoggedInUserOnly } = require("./middleware/autho");

const PORT = process.env.PORT || 5500;
const connectDB = require("./config/database");

// Connect to MongoDB **before defining routes**
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Homepage restricted to logged-in users
app.get("/", restrictToLoggedInUserOnly, async (req, res) => {
  res.render("home"); // your frontend will fetch notes via JS
});
app.get("/logout", (req, res) => {
    res.clearCookie("uid"); // Clear the JWT cookie
    res.redirect("/user/login"); // Redirect to login page
});

// Use user and notes routes
app.use("/user", userRoute);
app.use("/notes", routes2); // all CRUD routes under /notes


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
