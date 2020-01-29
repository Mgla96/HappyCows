'use strict';
module.exports = (sequelize, DataTypes) => {
  var Config = sequelize.define('cows', {
    conID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true},
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    tax: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  });

  Config.associate = function(models){//figure out relations
    //models.Config.hasMany(models.contains);
  };

  return Config;

}