const {get_all_commons} = require("../apis/users/index");

module.exports = async (req, res)=>{
    const user_obj = res.locals.user;
    const commons = await get_all_commons(req)
    res.render('user_select_commons',
    {data: 
        {
            commons: commons,
        }
    }
    /*
    res.render('user_select_commons', 
    {data : 
        { 
            id: 1,
            name: "Chem123-Winter2020",
            admin_uid: 0
        }
    }
    */
)};