
const {get_cow_total, get_user_wealth, get_cow_common_price, get_user_cow_health} = require("../apis/users/index");
module.exports = async (req, res)=>{
    const user_obj = res.locals.user;
    cowTotal = await get_cow_total(cid, res.locals.user.id);
    userWealth = await get_user_wealth(cid, res.locals.user.id);
    cowPrice = await get_cow_common_price(cid, res.locals.user.id);
    cowHealth = await get_user_cow_health(cid, res.locals.user.id);
    res.render('user_main', {data : 
        {
            userCows: cowTotal,
            userName: user_obj.firstName,
            userMoney: userWealth,
            userCowsHealth: cowHealth,
            cowPrice: cowPrice,
            cid:cid
        }
    },
)}