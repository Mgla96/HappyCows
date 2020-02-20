const {get_auth_url,get_email_from_at, get_token_for_email} = require('../../utils/auth');

async function get_link(){
<<<<<<< HEAD
    return true, get_auth_url;
=======
    return true, get_auth_url();
>>>>>>> 9977df71e6cc616bcb9c66886e114dfc2c5bbd97
}

async function auth(google_token){
    const email = await get_email_from_at(google_token)
    if (!email){
<<<<<<< HEAD
        return false, null
    }
    return true, await get_token_for_email(email)
=======
        return {
            success: false, 
            data: null
        }
    }
    let data = await get_token_for_email(email)
    return {
        success: true, 
        data: data
    }
>>>>>>> 9977df71e6cc616bcb9c66886e114dfc2c5bbd97
}

module.exports = { 
    get_link, 
    auth
};
  