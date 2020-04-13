const {get_common_health} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    const data = await get_common_health(req.params.commonId);
    res.csv(data, true
    )
};
