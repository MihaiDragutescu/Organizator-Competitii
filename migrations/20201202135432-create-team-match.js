'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeamMatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teams',
          },
          key: 'id',
        },
      },
      matchId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Matches',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeamMatches');
  }
};