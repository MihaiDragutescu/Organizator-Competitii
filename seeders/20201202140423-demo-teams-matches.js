'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teamsQuery = await models.Team.findAll();
    const matchesQuery = await models.Match.findAll();
    const teamsMatchesArray = new Array();

    for (var i = 0; i < 20; i++) {
      var index = Math.floor(i / 2);
      teamsMatchesArray.push({
        teamId: teamsQuery[i].id,
        matchId: matchesQuery[index].id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('TeamMatches', teamsMatchesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TeamMatches', null, {});
  }
};
