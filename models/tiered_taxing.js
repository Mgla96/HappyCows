'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tiered_Taxing = sequelize.define('Tiered_Taxing', {
    tax: DataTypes.INTEGER
  }, {});
  Tiered_Taxing.associate = function(models) {
    models.Tiered_Taxing.belongsTo(models.Config)
  };
  return Tiered_Taxing;
};