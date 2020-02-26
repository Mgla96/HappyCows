'use strict';
module.exports = (sequelize, DataTypes) => {
  const TieredTaxing = sequelize.define('TieredTaxing', {
    tax: DataTypes.INTEGER
  }, {});
  TieredTaxing.associate = function(models) {
    models.TieredTaxing.belongsTo(models.Config) //association key in TieredTaxing model
  };
  return TieredTaxing;
};