const {get_all_commons, get_user_commons, get_user_info} = require("../apis/users/index");

module.exports = async (req, res)=>{
    const user_obj = res.locals.user;  //is user_obj all strings? or will I have to convert user_obj.id to string
    const commons = await get_all_commons(req);
    const commons_user = await get_user_commons(req, String(user_obj.id));
    const user_info = await get_user_info(String(user_obj.id));
    console.log("user_info=",user_info);
    res.render('user_select_commons',
    {data: 
        {
            commons: commons,
            commons_user: commons_user,
            user_info: user_info
        }
    }
)};