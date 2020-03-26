var db = require("../../models/index")
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
var {get_health, get_players} = require("../../utils/sql")
const { QueryTypes } = require('sequelize');

async function create_common(name, user_id,
                       cow_price, milk_price,
                       start_date, end_date) {
    let common = db.Commons.build({
        admin_uid: user_id,
        name: name,
    });
    await common.save();
    db.Configs.build({
        milkPrice: milk_price,
        cowPrice: cow_price,
        startDate: start_date,
        endDate: end_date,
        maxCowPerPerson: 1000,
        costPerCow: 1000,
        degradeRate: 15,
        CommonId: common.id
    }).save();
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


module.exports = {
    create_common,
    get_commons
}