
const {get_cow_total, get_user_wealth, get_cow_common_price,
    get_user_cow_health,get_common_day,
    get_end_date,get_all_milkings,get_user_total} = require("../apis/users/index");
module.exports = async (req, res)=>{
    const user_obj = res.locals.user;
    const cid = req.params.id;
    cowTotal = await get_cow_total(cid, res.locals.user.id);
    userWealth = await get_user_wealth(cid, res.locals.user.id);
    cowPrice = await get_cow_common_price(cid, res.locals.user.id);
    cowHealth = await get_user_cow_health(cid, res.locals.user.id);
    daynum = await get_common_day(cid);
    endDate = await get_end_date(cid);
    milkProfits = await get_all_milkings(req, cid,res.locals.user.id);
    userTotal = await get_user_total(cid);
    res.render('user_main', {data : 
        {
            userCows: cowTotal,
            userName: user_obj.firstName,
            userMoney: userWealth,
            userCowsHealth: cowHealth,
            cowPrice: cowPrice,
            cid:cid,
            day:daynum,
            endDate:endDate,
            milkProfits: milkProfits,
            userTotal:userTotal
        }
    },
)}