'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const matchesArray = new Array();

    for (var i = 0; i < 4; i++) {
      var team1 = i * 2 + 1;
      var team2 = i * 2 + 2;

      matchesArray.push({
        competitionId: 1,
        dateOfMatch: faker.date.past(),
        idTeam1: team1,
        idTeam2: team2,
        score: '2:1'
      });
    }

    for (var i = 0; i < 4; i++) {
      var team1 = i * 2 + 9;
      var team2 = i * 2 + 10;

      matchesArray.push({
        competitionId: 2,
        dateOfMatch: faker.date.past(),
        idTeam1: team1,
        idTeam2: team2,
        score: '1:3'
      });
    }

    for (var i = 0; i < 2; i++) {
      var team1 = i * 2 + 17;
      var team2 = i * 2 + 18;

      matchesArray.push({
        competitionId: 3,
        dateOfMatch: faker.date.past(),
        idTeam1: team1,
        idTeam2: team2,
        score: '3:2'
      });
    }

    await queryInterface.bulkInsert('Matches', matchesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Matches', null, {});
  }
};
