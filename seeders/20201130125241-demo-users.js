'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const usersArray = new Array(10).fill().map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    usersArray[5].admin=true;
    await queryInterface.bulkInsert('Users', usersArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};