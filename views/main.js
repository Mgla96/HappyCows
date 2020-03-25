const {get_cow_total, get_user_wealth} = require("../apis/users/index");
/*
when user selects commons from choose commons page it will redirect user to that specific commons
also data is loaded for that user in the common
*/

module.exports = async(req, res)=>{
    //const user_obj = res.locals.user;

    const user_obj = res.locals.user;
    console.log(req.body.cid);
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
