const {user_sell_cow} = require("../apis/users/index");

module.exports = async (req, res) => {
    //console.log(res.locals.user_id);
    await user_sell_cow(
        req.body.cid,
        res.locals.user.id,
    );
};
