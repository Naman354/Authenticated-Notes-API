const {getUser} = require('../service/auth');
async function restrictToLoggedInUserOnly(req, res, next){
    console.log('middleware hit');
    if (req.path === "/user/login" || req.path === "/user") return next();
    const userUid = req.cookies.uid;

    if(!userUid) return res.redirect("/user/login");
    const user = await getUser(userUid);

    if (!user) return res.redirect("/user/login");

    req.user = user;
    next();
}
module.exports = {
    restrictToLoggedInUserOnly,
}