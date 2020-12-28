'use strict';
const faker = require('faker');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const usersArray = new Array();

    for (var i = 0; i < 10; i++) {
      const password = faker.internet.password();
      const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);

      usersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    usersArray[5].admin = true;
    usersArray[5].password = await bcrypt.hash("PAROLA", config.SALT_ROUNDS);
    await queryInterface.bulkInsert('Users', usersArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};