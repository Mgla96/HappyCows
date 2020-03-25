const {auth} = require("../apis/users/auth")

module.exports = async (req, res) => {
    const google_token = req.query.code;
    let {success, data} = await auth(google_token);
    console.log(success, data)
    if (!success){
        res.redirect("/?err");
        return
    }
    const {is_new, token} = data;
    res.cookie('token',token, { maxAge: 9000000000, httpOnly: true });
    if (is_new){
        res.redirect("/users/update_info")
    } else{
        res.redirect("/choosecommons")
    }
}