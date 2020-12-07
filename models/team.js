'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {

    static associate(models) {
      models.Team.belongsToMany(models.Match, {
        through: 'TeamMatches',
        as: 'matches',
        foreignKey: 'teamId'
      });
      
      models.Team.hasMany(models.Member);
    }
  };
  Team.init({
    teamName: DataTypes.STRING,
    numberOfMembers: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};