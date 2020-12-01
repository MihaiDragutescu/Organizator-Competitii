'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {

    static associate(models) {
      //models.Team.hasMany(models.Match,{as: 'teamId1'});
      //models.Team.hasMany(models.Match,{as: 'teamId2'});
      models.Team.hasOne(models.Member,{foreignKey: 'captainId'});
      //models.Team.hasMany(models.Member,{as: 'teamId'});
    }
  };
  Team.init({
    teamName: DataTypes.STRING,
    numberOfMembers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};