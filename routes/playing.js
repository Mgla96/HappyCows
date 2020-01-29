//relationship between Users and Commons
//Primary Keys: uID, comID
//Foreign Keys: uID, comID
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