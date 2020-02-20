module.exports = (req, res)=>{
    const user_obj = res.locals.user;
    res.render('user_main', {data : {userCows: 4,
        userName: user_obj.email,
        userMoney: 420,
        userCowsHealth: 69    
    }}
)}