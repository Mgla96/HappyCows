//relationship between Users & Cows
//Primary Keys: uID, cID
//Foreign Keys: uID, cID
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Owns = sequelize.define('owns', {
   
  });

  Owns.associate = function(models){
    
  };

  return Owns;

}