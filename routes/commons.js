'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('Commons', {
    comID: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  });

  Commons.associate = function(models){
    models.Commons.hasMany(models.Task);
  };

  return Commons;

}