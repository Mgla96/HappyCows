const {create_common} = require("../apis/admin/commons");

module.exports = async (req, res) => {
    console.log(res.locals.user_id)
    await create_common(
        req.body.name,
        res.locals.user.id,
        req.body.cow_price,
        req.body.milk_time,
        new Date(req.body.start_date),
        new Date(req.body.end_date)
    );
    res.redirect("/admin/");
};
