const {get_users} = require("../apis/admin/users");

module.exports = async (req, res) => {
    const users = await get_users(req);
    res.render('admin_commons',
        {data :
            {
                users: users,
            }
        }
    )
};
