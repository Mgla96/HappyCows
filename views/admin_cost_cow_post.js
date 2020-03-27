const {cost_per_cow_update} = require("../apis/admin/common_config");

module.exports = async (req, res) => {
    console.log(res.locals.user_id)
    console.log("cid: " + req.body.cid);
    console.log("val: "+req.body.val);
    await cost_per_cow_update(
        req.body.cid,
        req.body.val
    );
    
    res.redirect("/admin/common/"+req.body.cid);
};