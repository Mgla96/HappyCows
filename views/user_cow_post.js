const {user_buy_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    await user_buy_cow(
        100,
        "status",
        req.body.cid, //will need to make this
        res.locals.user.id,
    );
    res.redirect("/play");
};
