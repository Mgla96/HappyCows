'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('Cows', {
    cID: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    health: DataTypes.INTEGER
  });

  Cows.associate = function(models){
    models.Cows.hasMany(models.Task);
  };

  return Cows;

}