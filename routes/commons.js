'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commons = sequelize.define('Commons', {
    commons: DataTypes.STRING
  });

  Commons.associate = function(models){
    models.Commons.hasMany(models.Task);
  };

  return Commons;

}