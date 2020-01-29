'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('Commons', {
    conID: DataTypes.STRING
  });

  Commons.associate = function(models){
    models.Commons.hasMany(models.Task);
  };

  return Commons;

}