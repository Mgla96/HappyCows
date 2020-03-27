const {milk_test} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    console.log("local userID: " + res.locals.user_id + "\n\n\n");
    await milk_test(
        req.body.cid,
        1,
    );
    res.redirect("/admin/common/"+req.body.cid);
};