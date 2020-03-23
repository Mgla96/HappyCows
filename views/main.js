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