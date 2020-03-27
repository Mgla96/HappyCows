const {get_users_in_common} = require("../apis/admin/user_in_common");
const {get_cow_price,get_max_cow,get_degrade_rate,get_start_date,get_end_date,get_milk_price,get_tax_rate} = require("../apis/admin/common_config");

module.exports = async (req, res) => {
    const users = await get_users_in_common(req, req.params.commonId);
    const cowPrice = await get_cow_price(res.locals.user.id);
    const cowMax = await get_max_cow(res.locals.user.id);
    const degradeRate = await get_degrade_rate(res.locals.user.id);
    const startDate = await get_start_date(res.locals.user.id);
    const endDate = await get_end_date(res.locals.user.id);
    const milkPrice = await get_milk_price(res.locals.user.id);
    const taxPrice = await get_tax_rate(req.params.commonId);

    res.render('admin_commons',
        {data :
            {
                users: users,
                commonId: req.params.commonId,
                cowPrice: cowPrice,
                cowMax: cowMax,
                degradeRate: degradeRate,
                startDate: startDate,
                endDate: endDate,
                milkPrice: milkPrice,
                taxPrice: taxPrice
            }
        }
    )
};
