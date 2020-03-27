const {milk_price_update} = require("../apis/admin/common_config");

module.exports = async (req, res) => {
    console.log(res.locals.user_id)
    await milk_price_update(
        req.body.cid,
        req.body.val
    );
    res.redirect("/admin/common/"+req.body.cid);
};