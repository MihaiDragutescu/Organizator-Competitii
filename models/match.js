'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {

    static associate(models) {
      models.Match.belongsTo(models.Competition);
      models.Match.belongsToMany(models.Team,{
        through: 'TeamsMatches',
        as: 'teams',
        foreignKey: 'matchId'
      });
    }
  };
  Match.init({
    dateOfMatch: DataTypes.DATE,
    competitionId: DataTypes.INTEGER,
    score: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};