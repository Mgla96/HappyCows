const {user_buy_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    //console.log(res.locals.user_id);
    await user_buy_cow(
        req.body.cid,
        res.locals.user.id,
    );
};
