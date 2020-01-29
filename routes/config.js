'use strict';
module.exports = (sequelize, DataTypes) => {
  var Config = sequelize.define('Cows', {
    conID: DataTypes.STRING
    milkTime: DataTypes.STRING
    cowPrice: DataTypes.STRING
    tax: DataTypes.STRING
    startDate: DataTypes.DATE
    endDate: DataTypes.DATE
  });

  Config.associate = function(models){
    models.config.hasMany(models.Task);
  };

  return Config;

}