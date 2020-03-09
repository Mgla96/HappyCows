'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commons = sequelize.define('Commons', {
    name: {
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      admin_uid: DataTypes.INTEGER
    }
  }, {});
  Commons.associate = function(models) {
    models.Commons.hasOne(models.Configs) // association key in Config model
    models.Commons.belongsToMany(models.Users, {through: models.UserCommons}) //assocation key in Commons model
    models.Commons.hasMany(models.Cows) //association key in Cows model
    models.Commons.hasMany(models.UserWealths) //association key in UserWealth model
  };
  return Commons;
};