'use strict';
module.exports = (sequelize, DataTypes) => {
  const TieredTaxings = sequelize.define('TieredTaxings', {
    tax: DataTypes.INTEGER
  }, {});
  TieredTaxings.associate = function(models) {
    models.TieredTaxings.belongsTo(models.Configs) //association key in TieredTaxing model
  };
  return TieredTaxings;
};