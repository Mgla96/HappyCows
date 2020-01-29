'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('Cows', {
    cows: DataTypes.STRING
  });

  Cows.associate = function(models){
    models.Cows.hasMany(models.Task);
  };

  return Cows;

}