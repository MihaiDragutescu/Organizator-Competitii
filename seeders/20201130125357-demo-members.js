'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const membersArray = new Array();

    for (var i = 0; i < 88; i++) {
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Members', membersArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
