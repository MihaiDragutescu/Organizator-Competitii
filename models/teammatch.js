'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  }, {
    sequelize,
    modelName: 'TeamMatch',
  });
  return TeamMatch;
};