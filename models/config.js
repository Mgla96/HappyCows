'use strict';
module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    maxCowPerPerson: DataTypes.INT,
    costPerCow: DataTypes.FLOAT,
    degradeRate: DataTypes.FLOAT,

  }, {});
  Config.associate = function(models) {
    models.Config.belongsTo(models.Commons) //association key in source model aka Config 
    models.Config.hasMany(models.TieredTaxing) //association key in target model aka TieredTaxing
  };
  return Config;
};