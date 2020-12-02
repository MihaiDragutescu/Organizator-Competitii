'use strict';
//const models = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const teamsArray = new Array();

    //const matches = await models.Match.findAll();

    for (var i = 0; i < 8; i++)
      teamsArray.push({
        teamName: faker.address.city(),
        numberOfMembers: 11,
        //matches: matches,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    for (var i = 0; i < 8; i++)
      teamsArray.push({
        teamName: faker.address.country(),
        numberOfMembers: 2,
        //matches: matches,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    for (var i = 0; i < 4; i++)
      teamsArray.push({
        teamName: "",
        numberOfMembers: 4,
        //matches: matches,
        createdAt: new Date(),
        updatedAt: new Date()
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
