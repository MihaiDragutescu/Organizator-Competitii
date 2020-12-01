const models = require('../models');

const resolver = {
  user: async ({ userId }) => {
    const user = await models.User.findByPk(userId);
    return user;
  },
};

module.exports = resolver;