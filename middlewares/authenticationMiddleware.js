const jwt = require('jsonwebtoken');
const config = require('../config/config1');

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    jwt.verify(token, config.JWTSECRET, (err, data) => {
        if (err) {
            res.status(401).send({
                status: "You are not allowed here!"
            });
        } else {
            next()
        }
    });
};

module.exports = authenticationMiddleware;