'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('cows', {
    cID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true},
    health: DataTypes.INTEGER
  });

  Cows.associate = function(models){ //figure out relation
    //models.Cows.hasMany(models.owns);
    //models.Cows.hasMany(models.in);
  };

  return Cows;

}