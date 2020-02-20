const {get_auth_url,get_email_from_at, get_token_for_email} = require('../../utils/auth');

async function get_link(){
    return true, get_auth_url;
}

async function auth(google_token){
    const email = await get_email_from_at(google_token)
    if (!email){
        return false, null
    }
    return true, await get_token_for_email(email)
}

module.exports = { 
    get_link, 
    auth
};
  