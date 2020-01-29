'use strict';
module.exports = (sequelize, DataTypes) => {
  var Config = sequelize.define('cows', {
    conID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    //autoIncrement: true
    },
    milkTime: DataTypes.STRING,
    cowPrice: DataTypes.STRING,
    tax: DataTypes.STRING,
    createdAt:{ 
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: DataTypes.DATE
  });

  Config.associate = function(models){//figure out relations
    //models.Config.hasMany(models.contains);
  };

  return Config;

}