const {user_buy_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    await user_buy_cow(
        req.body.cid,
        res.locals.user.id,
    )
    res.redirect("/play");
};
