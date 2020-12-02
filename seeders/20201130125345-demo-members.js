'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const membersArray = new Array();

    for (var i = 0; i < 88; i++) {
      var captain=(i%11==10);
      var team=Math.floor(i/11)+1;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: team,
        dateOfBirth: faker.date.past(),
        teamCaptain: captain,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      var captain=(i%2==1);
      var team=Math.floor(i/2)+9;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: team,
        dateOfBirth: faker.date.past(),
        teamCaptain: captain,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      var captain=(i%4==3);
      var team=Math.floor(i/4)+17;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: team,
        dateOfBirth: faker.date.past(),
        teamCaptain: captain,
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
