'use strict';
const faker = require('faker');
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitionsQuery = await models.Competition.findAll();
    const matchesArray = new Array();

    for (var i = 0; i < 4; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: competitionsQuery[0].id,
        score: '2:1',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 4; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: competitionsQuery[1].id,
        score: '1:3',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 2; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: competitionsQuery[2].id,
        score: '3:2',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Matches', matchesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Matches', null, {});
  }
};
