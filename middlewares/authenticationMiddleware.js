const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const models = require('../models');

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    jwt.verify(token, config.JWTSECRET, (err, data) => {
        if (err) {
            next();
        } else {
            const user = models.User.findByPk(parseInt(data.userId));
            // Daca tokenul este valid, punem modelul User pe obiectul request (req).
            // Acesta va fi disponibil in context din graphql.
            req.user = user;
            next()
        }
    });
};

module.exports = authenticationMiddleware;