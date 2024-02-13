const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user,"GLA University Mathura201500280", { expiresIn: '30m' });
}

module.exports = generateAccessToken;
