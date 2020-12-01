'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitionsArray = new Array();

    competitionsArray.push({
      competitionName: 'Fotbal pe sate',
      startDate: new Date(2020, 11, 20),
      endDate: new Date(2020, 11, 30),
      type: 'Fotbal',
      format: 'Single elimination',
      numberOfTeams: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    competitionsArray.push({
      competitionName: 'Campionat tenis la dublu',
      startDate: new Date(2021, 10, 12),
      endDate: new Date(2021, 10, 28),
      type: 'Tenis',
      format: 'Single elimination',
      numberOfTeams: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    competitionsArray.push({
      competitionName: 'Turneu Dota 2',
      startDate: new Date(2020, 12, 11),
      endDate: new Date(2020, 12, 19),
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
