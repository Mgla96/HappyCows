var db = require("../../models/index")
const { QueryTypes } = require('sequelize');

db.Commons.sync();
db.Configs.sync();
db.Cows.sync();
db.TieredTaxings.sync();
db.UserCommons.sync();
db.Users.sync();
db.UserWealths.sync();

/*We want to keep track of commons health over time (CommonsHealth table),
everyone's wealth in common over time (UserWealths table)
total cows in commons over time? */

/*
In progress
*/
async function get_stats(cid, uid) {
    return await db.sequelize.query(
        'SELECT uw.id' +
        'FROM UserWealths as uw WHERE uw.id = ?',
        {
            replacements:[cid],
            type: QueryTypes.SELECT
        }).then((dbRes)=>{
            return dbRes;
    });
}

