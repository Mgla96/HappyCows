'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commons = sequelize.define('Commons', {
    name: DataTypes.STRING,
    admin_uid: DataTypes.INTEGER
  }, {});
  Commons.associate = function(models) {
    models.Commons.hasOne(models.Config)
    models.Commons.hasMany(models.Users)
    models.Commons.hasMany(models.Cows)
  };
  return Commons;
};