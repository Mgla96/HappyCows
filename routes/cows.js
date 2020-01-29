'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cows = sequelize.define('Cows', {
    cID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    //autoIncrement: true
    },
    health: DataTypes.INTEGER
  });

  Cows.associate = function(models){ //figure out relation
    models.Cows.belongsTo(Users)
    models.Cows.belongsTo(Commons)
  };

  return Cows;

}