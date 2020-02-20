const {get_link} = require("../apis/users/auth")

module.exports = (req, res) => {
    const _, google_link = get_link();
    const message = req.query.message;
    res.render('index', { google_link: google_link, message: message })
}