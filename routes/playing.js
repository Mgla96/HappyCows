//relationship between Users and Commons
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playing = sequelize.define('playing', {
    balance: DataTypes.INTEGER,
  });

  Playing.associate = function(models){
    models.Playing.belongsTo(models.Users, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        }
    });

  };

  return Playing;

}