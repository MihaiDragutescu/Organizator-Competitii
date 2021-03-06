'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {

    static associate(models) {
      models.Member.belongsTo(models.Team);
    }
  };
  Member.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    dateOfBirth: DataTypes.STRING,
    teamCaptain: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};