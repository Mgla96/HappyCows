'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    uID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    //autoIncrement: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING
  });

  Users.associate = function(models){ //figure out relation
    models.Users.hasMany(models.Commons);
    models.Users.hasMany(models.Cows);
    //models.Users.hasMany(models.playing);
  };

  return Users;

}