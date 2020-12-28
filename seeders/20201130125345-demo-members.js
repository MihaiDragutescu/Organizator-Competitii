'use strict';
const faker = require('faker');
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teamsQuery = await models.Team.findAll();
    const membersArray = new Array();

    for (var i = 0; i < 88; i++) {
      var captain = (i % 11 == 10);
      var index = Math.floor(i / 11);
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: teamsQuery[index].id,
        dateOfBirth: faker.date.past().toString(),
        teamCaptain: captain,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      var captain = (i % 2 == 1);
      var index = Math.floor(i / 2) + 8;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: teamsQuery[index].id,
        dateOfBirth: faker.date.past().toString(),
        teamCaptain: captain,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 16; i++) {
      var captain = (i % 4 == 3);
      var index = Math.floor(i / 4) + 16;
      membersArray.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        teamId: teamsQuery[index].id,
        dateOfBirth: faker.date.past().toString(),
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
