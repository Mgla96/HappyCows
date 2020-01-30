'use strict';
module.exports = (sequelize, DataTypes) => {
  var Config = sequelize.define('Cows', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    models.Config.belongsTo(models.Commons)
  };

  return Config;

}
