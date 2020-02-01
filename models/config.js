'use strict';
module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    tax: DataTypes.INTEGER
  }, {});
  Config.associate = function(models) {
    models.Config.belongsTo(models.Commons)
  };
  return Config;
};