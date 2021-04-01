const {remove_common} = require("../apis/admin/user_in_common");

module.exports = async (req, res) => {
    await remove_common(
        req.body.cid,
    );
    res.redirect("/admin");
};