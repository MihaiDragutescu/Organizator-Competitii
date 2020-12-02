'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const matchesArray = new Array();

    for (var i = 0; i < 4; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: 1,
        score: '2:1',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 4; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: 2,
        score: '1:3',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (var i = 0; i < 2; i++) {

      matchesArray.push({
        dateOfMatch: faker.date.past(),
        competitionId: 3,
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
