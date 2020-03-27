var db = require("../../models/index")
const { QueryTypes } = require('sequelize');

db.Commons.sync();
db.Configs.sync();
db.Cows.sync();
db.TieredTaxings.sync();
db.UserCommons.sync();
db.Users.sync();
db.UserWealths.sync();

async function get_stats(cid, uid) {
	
    return await db.sequelize.query(
        'SELECT uw.id, c.name ' +
        'FROM UserWealths as uw WHERE uw.id = ' + cid,
        {
            type: QueryTypes.SELECT
        }).then((dbRes)=>{
            return dbRes;
        });
    }

}