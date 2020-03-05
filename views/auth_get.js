const {get_link} = require("../apis/users/auth")

module.exports = async (req, res) => {
    let _v, google_link = await get_link();
    const message = req.query.message;
    res.redirect(google_link)
    // res.render('index', { google_link: google_link, message: message })
}