'use strict';
module.exports = (sequelize, DataTypes) => {
  const Configs = sequelize.define('Configs', {
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    maxCowPerPerson: DataTypes.INT,
    costPerCow: DataTypes.FLOAT,
    degradeRate: DataTypes.FLOAT,

  }, {});
  Configs.associate = function(models) {
    models.Configs.belongsTo(models.Commons) //association key in source model aka Config 
    models.Configs.hasMany(models.TieredTaxings) //association key in target model aka TieredTaxing
  };
  return Configs;
};