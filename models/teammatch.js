'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMatch extends Model {
   
    static associate(models) {
      
    }
  };
  TeamMatch.init({
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Match',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'TeamMatch',
  });
  return TeamMatch;
};