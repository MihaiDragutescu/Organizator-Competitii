'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const membersArray = new Array();

    for (var i = 0; i < 88; i++) {
      var team = Math.floor(i / 11) + 1;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        teamId: team
      });
    }

    for (var i = 0; i < 16; i++) {
      var team = Math.floor(i / 2) + 9;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        teamId: team
      });
    }

    for (var i = 0; i < 16; i++) {
      var team = Math.floor(i / 4) + 17;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        teamId: team
      });
    }

    await queryInterface.bulkInsert('Members', membersArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
