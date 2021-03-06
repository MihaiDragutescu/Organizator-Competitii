'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {

    static associate(models) {
      models.Match.belongsTo(models.Competition);
      models.Match.belongsToMany(models.Team, {
        through: 'TeamMatches',
        as: 'teams',
        foreignKey: 'matchId'
      });
    }
  };
  Match.init({
    dateOfMatch: DataTypes.STRING,
    competitionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Competition',
        key: 'id'
      }
    },
    score: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};