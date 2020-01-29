//relationship between Commons and Cows'use strict';
module.exports = (sequelize, DataTypes) => {
    var In = sequelize.define('in', {
      comID: DataTypes.INTEGER,
      primaryKey: true,
      
    });
  
    In.associate = function(models){
     
    };
  
    return In;
  
  }