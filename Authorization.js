const jwt = require('jsonwebtoken');

let secret_key = '1234567890'
function generateToken(user) {
    const payload = {
        user: {
            id: user.email_id,
        }
    };

    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });

    return token;
}

function authenticate(req, res, next) {
    let token = req.headers.authorization;
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
