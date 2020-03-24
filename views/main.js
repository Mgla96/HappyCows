const {get_cow_total} = require("../apis/users/index");
/*
when user selects commons from choose commons page it will redirect user to that specific commons
also data is loaded for that user in the common
*/

module.exports = (req, res)=>{
    const user_obj = res.locals.user;
    //res.locals.common.id,
    //req.common.cid
    //conss
    console.log(req.body.cid);
    
    //cowTotal = get_cow_total(req.body.cid, res.locals.user.id)
    //userWealth = get_user_wealth(req.body.cid, res.locals.user.id);
    cowTotal = 3;
    userWealth = 100;
    res.render('user_main', {data : 
        {
            userCows: cowTotal,
            userName: user_obj.firstName,
            userMoney: userWealth,
            userCowsHealth: 30
        }
    }
)}


/*
res.redirect("/");
module.exports = (req, res)=>{
    const user_obj = res.locals.user;
    res.render('user_main', {data : 
        {
            userCows: 4,
            userName: user_obj.firstName,
            userMoney: 400,
            userCowsHealth: 30
        }
    }
)}
*/