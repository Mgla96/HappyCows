'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_wealth = sequelize.define('user_wealth', {
    wealth: DataTypes.INTEGER
  }, {});
  user_wealth.associate = function(models) {
    // associations can be defined here
  };
  return user_wealth;
};