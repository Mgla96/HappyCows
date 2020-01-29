'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('commons', {
    comID: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  });

  Commons.associate = function(models){ //figure out relations
    //models.Commons.hasMany(models.playing);
    //models.Commons.hasMany(models.contains);
  };

  return Commons;

}