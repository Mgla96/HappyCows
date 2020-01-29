//relationship between Commons and Config
//primary keys: comID, conID
//foreign keys: comID, conID
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contains = sequelize.define('contains', {
   
  });

  Contains.associate = function(models){ 
    
  };

  return Contains;

}