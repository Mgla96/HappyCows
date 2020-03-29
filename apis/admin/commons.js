var db = require("../../models/index")
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
var {get_health, get_players} = require("../../utils/sql")
const { QueryTypes } = require('sequelize');

db.Configs.sync();
db.TieredTaxings.sync();
db.Cows.sync();
db.Commons.sync();
db.UserWealths.sync();

async function get_conf_id_2(cid){
    return await db.Configs.findAll({
        attributes: ['id'],
        where: { CommonId: cid }
      }).then((dbRes)=>{
        if (dbRes.length == 1){
          let currentRes = dbRes[0];
          return currentRes.id;
        } else {
          return false
        }
      })
}
async function create_common(name, user_id,cow_price, milk_price,start_date, end_date) {
    let common = db.Commons.build({
        admin_uid: user_id,
        name: name,
    });
    await common.save();
    let config = db.Configs.build({
        milkPrice: milk_price,
        cowPrice: cow_price,
        startDate: start_date,
        endDate: end_date,
        maxCowPerPerson: 1000,
        degradeRate: 15,
        CommonId: common.id
    });
    await config.save();
    let confId = await get_conf_id_2(common.id);
    let tax = db.TieredTaxings.build({
        tax: 10,
        ConfigId: confId
    })
    await tax.save();
    return true;
}

function get_commons(req) {
    return db.sequelize.query(
        'SELECT c.id, c.name, u.firstName, ' +
        `(${get_health} c.id) AS health, ` +
        `(${get_players} c.id) AS players ` +
        `FROM Commons AS c JOIN Users AS u ON u.id = c.admin_uid ` +
        'LIMIT ?, ?',
        {
            replacements: [
                ...paging_raw(req)
            ],
            type: QueryTypes.SELECT
        }).then((dbRes)=>{
        return dbRes;
    });
}

async function get_common_info(cid) {
    return await db.sequelize.query(
		'SELECT c.id, c.name ' +
		'FROM Commons as c WHERE c.id = ?',
		{
			replacements: [
				cid
			],
			type: QueryTypes.SELECT
		}).then((dbRes)=>{
		return dbRes;
	});
}
//used for testing milking and if correctly listing all milk profits for user
async function milk_test(cid, uid) {
    let milk = db.UserWealths.build({
        wealth: "70",
        type: "milk",
        CommonId: cid,
        UserId: uid
    });
    await milk.save();
    return true;
}


async function get_avg_cow_health(cid){
	result = await db.sequelize.query(
		'SELECT AVG(c.health) ' +
		`FROM Cows AS c `+
		'WHERE c.CommonId = ' + cid,
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			if(sol==null){
				return 100;
			}
			else{
				return parseInt(sol, 10).toFixed(0);
			}		
		});
	return result;
}

module.exports = {
    create_common,
    get_commons,
    get_common_info,
    milk_test,
    get_avg_cow_health
}