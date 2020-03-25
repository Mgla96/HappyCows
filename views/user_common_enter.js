const {get_cow_total, get_user_wealth} = require("../apis/users/index");
/*
when user selects commons from choose commons page it will redirect user to that specific commons
also data is loaded for that user in the common
this file isn't needed think I could do it directly in main
*/
module.exports = async (req, res)=>{
    const user_obj = res.locals.user;
    cowTotal = await get_cow_total(req.body.cid, res.locals.user.id);
    userWealth = await get_user_wealth(req.body.cid, res.locals.user.id);
    res.render('user_main', {data : 
        {
            userCows: cowTotal,
            userName: user_obj.firstName,
            userMoney: userWealth,
            userCowsHealth: 30,
            cid:req.body.cid
        }
    },
)}
