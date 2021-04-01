const {user_sell_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    await user_sell_cow(
        req.body.cid,
        res.locals.user.id,
    )
    res.redirect("/play/" + req.body.cid);
};
