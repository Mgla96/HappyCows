'use strict';
module.exports = (sequelize, DataTypes) => {
  var Config = sequelize.define('Cows', {
    config: DataTypes.STRING
  });

  Config.associate = function(models){
    models.config.hasMany(models.Task);
  };

  return Config;

}