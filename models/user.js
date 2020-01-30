'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING
  });

  Users.associate = function(models){ //figure out relation
    models.Users.hasMany(models.Commons);
    models.Users.hasMany(models.Cows);
  };
  return Users;
}
