'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitionsArray = new Array();

    competitionsArray.push({
      competitionName: 'Fotbal pe sate',
      startDate: new Date(2020, 11, 20).toString(),
      endDate: new Date(2020, 11, 30).toString(),
      type: 'Fotbal',
      format: 'Single elimination',
      numberOfTeams: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    competitionsArray.push({
      competitionName: 'Campionat tenis la dublu',
      startDate: new Date(2021, 10, 12).toString(),
      endDate: new Date(2021, 10, 28).toString(),
      type: 'Tenis',
      format: 'Single elimination',
      numberOfTeams: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    competitionsArray.push({
      competitionName: 'Turneu Dota 2',
      startDate: new Date(2020, 12, 11).toString(),
      endDate: new Date(2020, 12, 19).toString(),
      type: 'Gaming',
      format: 'Round Robin',
      numberOfTeams: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.bulkInsert('Competitions', competitionsArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competitions', null, {});
  }
};
