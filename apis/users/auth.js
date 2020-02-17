const {get_auth_url,get_email_from_at, get_token_for_email} = require('../../utils/auth');

async function get_link(req, res){
    res.json({
        success: true,
        data: get_auth_url()
    })
}

async function auth(req, res){
    const {google_token} = req.body;
    const email = await get_email_from_at(google_token)
    if (!email){
        res.json({
            data: "",
            success: false,
            message: "Google's fault"
        })
    }
    res.json({
        data: await get_token_for_email(email),
        success: true
    })
}

module.exports = { 
    get_link, 
    auth
};
  