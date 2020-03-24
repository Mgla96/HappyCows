const {get_all_commons, get_user_commons} = require("../apis/users/index");

module.exports = async (req, res)=>{
    const user_obj = res.locals.user;  //is user_obj all strings? or will I have to convert user_obj.id to string
    const commons = await get_all_commons(req);
    const commons_user = await get_user_commons(req, String(user_obj.id));
    res.render('user_select_commons',
    {data: 
        {
            commons: commons,
            commons_user: commons_user
        }
    }
)};