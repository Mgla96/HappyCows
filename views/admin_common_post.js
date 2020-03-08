const {create_common} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    await create_common(
        req.body.name,
        req.body.user_id,
        req.body.cow_price,
        req.body.milk_time,
        req.body.start_date,
        req.body.end_date
    );
    res.redirect("/admin/");
};
