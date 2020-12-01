'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    
    static associate(models) {
      models.Competition.hasMany(models.Match);
    }
  };
  Competition.init({
    competitionName: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    type: DataTypes.STRING,
    format: DataTypes.STRING,
    numberOfTeams: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};