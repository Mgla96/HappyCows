'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cows = sequelize.define('Cows', {
    health: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Cows.associate = function(models) {
    models.Cows.belongsTo(models.Users) //association key in Cows model
    models.Cows.belongsTo(models.Commons) //assocation key in Cows model
  };
  return Cows;
};
