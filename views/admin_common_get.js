const {get_users_in_common} = require("../apis/admin/user_in_common");
const {get_common_info} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    const users = await get_users_in_common(req, req.params.commonId);
    res.render('admin_commons',
        {data :
            {
                users: users,
                commonId: req.params.commonId,
            }
        }
    )
};
