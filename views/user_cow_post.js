const {user_buy_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    console.log(res.locals.user_id)
    await user_buy_cow(
        100,
        "status",
        res.locals.common.id, //will need to make this
        res.locals.user.id,
    );
    res.redirect("/");
};
