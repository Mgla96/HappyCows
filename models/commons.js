'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('Commons', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    admin_uid: Sequelize.INTEGER
  });

  Commons.associate = function(models){ //figure out relations
    models.Commons.hasOne(models.Config)
    models.Commons.hasMany(models.Users)
    models.Commons.hasMany(models.Cows)
  };

  return Commons;

}
