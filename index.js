const express = require('express');
const app = express();
const path = require("path");
const userRoute = require('./routes/Routes');

const PORT=5500;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));  

app.get("/", async (req, res) =>{
    return res.render("home");
});
app.use("/user", userRoute);
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})