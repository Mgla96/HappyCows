var db = require("../../models/index")
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
var {get_wealth, get_cows} = require("../../utils/sql")

function create_common(name, user_id,
                       cow_price, milk_time,
                       start_date, end_date) {
    db.Commons.build({
        admin_uid: user_id,
        name: name,
    }).save();
    db.Configs.build({
        milkTime: milk_time,
        cowPrice: cow_price,
        startDate: start_date,
        endDate: end_date
    }).save();
    return true;
}

function get_commons(req) {
    return db.sequelize.query(
        'SELECT c.name, u.firstName, ' +
        `(${get_wealth} id) AS health, ` +
        `JOIN Users AS u ON u.id = c.admin_uid ` +
        'FROM Commons AS c  LIMIT ?, ?',
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
    create_common
}