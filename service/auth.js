const jwt = require('jsonwebtoken')
const secret = 'Naman@123@$'

function setUser(user) {
    return jwt.sign({
        _id: user._id.toString(),
        email: user.email,
    }, secret, { expiresIn: '1h' }); // optional expiration
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret); // returns {_id, email, iat, exp}
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

module.exports = {
    setUser, getUser,
};
