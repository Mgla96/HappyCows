//relationship between Users & Cows
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Owns = sequelize.define('owns', {
   
  });

  Owns.associate = function(models){
    
  };

  return Owns;

}