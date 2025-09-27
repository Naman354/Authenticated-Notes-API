const { getUser } = require('../service/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
    console.log('middleware hit');

    // Skip middleware for login/register routes
    if (req.path === "/user/login" || req.path === "/user") return next();

    // Get JWT token from cookies
    const token = req.cookies.uid;

    if (!token) {
        console.log("No token found, redirecting to login");
        return res.redirect("/user/login");
    }

    // Verify token and get user
    const user = await getUser(token);
    console.log("User from cookie middleware:", user);

    if (!user) {
        console.log("Invalid token, redirecting to login");
        return res.redirect("/user/login");
    }

    // Attach user to request object
    req.user = user;

    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
};
