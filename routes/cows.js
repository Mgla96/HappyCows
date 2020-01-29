'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('Cows', {
    cID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    //autoIncrement: true
    },
    health: DataTypes.INTEGER
  });

  Cows.associate = function(models){ //figure out relation
    models.Cows.hasOne(Users)
    //models.Cows.hasMany(models.owns);
    //models.Cows.hasMany(models.in);
  };

  return Cows;

}