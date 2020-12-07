const jwt = require('jsonwebtoken');
const config1 = require('../config/config1');

const publicRootValue = {
  login: ({ email, password }) => {
    if (email === 'Donavon66@hotmail.com' && password === 'oAl2FMwdy31Q1r6') {
      const token = jwt.sign({}, config1.JWTSECRET);
      return {
        token,
      };
    } else {
      return null;
    }
  }
};

module.exports = publicRootValue;