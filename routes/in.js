//relationship between Commons and Cows
//Primary Keys: comID, cID
//Foreign Keys: comID, cID

'use strict';
module.exports = (sequelize, DataTypes) => {
    var In = sequelize.define('in', {
      comID: DataTypes.INTEGER,
      primaryKey: true,

    });
  
    In.associate = function(models){
     
    };
  
    return In;
  
  }