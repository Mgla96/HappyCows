'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('Commons', {
    comID: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    //autoIncrement: true
  });

  Commons.associate = function(models){ //figure out relations
    models.Commons.hasOne(models.Config)
    models.Commons.hasMany(models.Users)
    models.Commons.hasMany(models.Cows)
  };

  return Commons;

}