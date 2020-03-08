const {get_commons} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    const commons = await get_commons(req);
    res.render('admin_main',
        {data :
                {
                    commons: commons,
                }
        }
    )
};
