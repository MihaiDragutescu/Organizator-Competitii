'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const teamsArray = new Array();

    for (var i = 0; i < 8; i++)
      teamsArray.push({
        teamName: faker.address.city(),
        captainId: i*11 + 1,
        numberOfMembers: 11
      });

    for (var i = 0; i < 8; i++)
      teamsArray.push({
        teamName: faker.address.country(),
        captainId: i*2 + 89,
        numberOfMembers: 2
      });

    for (var i = 0; i < 4; i++)
      teamsArray.push({
        teamName: "",
        captainId: i*4 + 105,
        numberOfMembers: 4
      });

    teamsArray[16].teamName = 'Team Secret';
    teamsArray[17].teamName = 'Team Aster';
    teamsArray[18].teamName = 'Vici Gaming';
    teamsArray[19].teamName = 'Team Liquid';

    await queryInterface.bulkInsert('Teams', teamsArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
