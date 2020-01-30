'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('Cows', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    health: DataTypes.INTEGER
  });

  Cows.associate = function(models){ //figure out relation
    models.Cows.belongsTo(Users)
    models.Cows.belongsTo(Commons)
  };

  return Cows;

}