const jwt = require('jsonwebtoken');
require('dotenv').config();

let secret_key = process.env.secret_key;
function generateToken(user) {
    const payload = {
        user: {
            userID: user.userId,
            userName:user.userName,
            password : user.password,
            userType : user.userType,
            emailId : user.emailId,
            firstName : user.firstName,
            lastName : user.lastName

        }
    };

    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
    console.log(token);
    return token;
}

function authenticate(req, res, next) {
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    let token2 = token.split(' ');
    token = token2[1];
    if (!token && token2[0] != 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
module.exports = { generateToken, authenticate };
