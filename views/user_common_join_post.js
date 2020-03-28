
const {join_common} = require("../apis/users/index");

module.exports = async (req, res) => {
    //console.log(res.locals.user_id);
    await join_common(
        req.body.cid,
        res.locals.user.id,
        req.body.log
    );
    res.redirect("/choosecommons/");
};
