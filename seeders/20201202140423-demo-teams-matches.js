'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teamsMatchesArray = new Array();
    
    for (var i = 0; i < 20; i++) {
      var team=i+1;
      var match=Math.floor(i/2)+1;
      teamsMatchesArray.push({
        teamId:team,
        matchId:match,
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
