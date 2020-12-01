'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Competition.init({
    competitionName: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    type: DataTypes.STRING,
    format: DataTypes.STRING,
    numberOfTeams: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};