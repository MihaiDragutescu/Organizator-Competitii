'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {

    static associate(models) {
      models.Match.belongsTo(models.Competition);
    }
  };
  Match.init({
    dateOfMatch: DataTypes.DATE,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};