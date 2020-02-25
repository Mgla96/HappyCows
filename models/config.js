'use strict';
module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Config.associate = function(models) {
    models.Config.belongsTo(models.Commons) //association key in source model aka Config 
  };
  return Config;
};