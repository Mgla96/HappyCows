'use strict';
module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Configs', {
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Config.associate = function(models) {
    models.Configs.belongsTo(models.Commons) //association key in source model aka Config 
    models.Configs.hasMany(models.TieredTaxings) //association key in target model aka TieredTaxing
  };
  return Configs;
};