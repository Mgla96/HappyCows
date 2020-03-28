const {remove_user_from_common} = require("../apis/admin/user_in_common");

module.exports = async (req, res) => {
    //console.log(res.locals.user_id)
    await remove_user_from_common(
        req.body.cid,
        res.locals.user.id
    );
    res.redirect("/admin/common/"+req.body.cid);
};