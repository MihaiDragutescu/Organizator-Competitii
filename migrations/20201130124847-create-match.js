'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      competitionId: {
        type: Sequelize.INTEGER
      },
      dateOfMatch: {
        type: Sequelize.DATE
      },
      idTeam1: {
        type: Sequelize.INTEGER
      },
      idTeam2: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};