const {google} = require('googleapis');
const fetch = require("node-fetch")
const uuidv1 = require('uuid/v1');
var db = require("../models/index")

// oauth
function get_new_client(){
    return new google.auth.OAuth2(
        "223268329188-00a753ugkfeobh79lkugn64jsskqlf2e.apps.googleusercontent.com", // TODO: change it 
        "PbEMXojjo7rdghKqkgvG-tfV",
        "https://localhost:3000"
    );
}

const oauth2Client = get_new_client()

function get_auth_url(){
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email'],
    });
}

async function get_token_from_at(v){
    return oauth2Client.getToken(v).then(v=>{
        return v.tokens
    }).catch(e=>{
        // console.log(e)
        return ""
    })
}

async function get_email_from_at(v){
    const token = await get_token_from_at(v);
    if (token === "") { return "" }
    accessToken = token.access_token
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
    const json = await response.json()
    return json.email;
}

// token
// TODO: use redis for cache
function get_token_for_email(email){
    return db.Users.findAll({
        attributes: ['id', 'token'],
        where: { email: email }
    }).then((dbRes)=>{
        if (dbRes.length >= 1){
            return {
                is_new: false,
                token: dbRes[0].token
            };
        } else {
            token = uuidv1();
            db.Users.build({
                email: email,
                token: token,
                type: "user"
            }).save()
            return {
                is_new: true,
                token: token
            };
        }
    })
}

function get_user_from_token(token){
    return db.Users.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
        where: { token: token }
    }).then((dbRes)=>{
        if (dbRes.length == 0){
            return null;
        } else {
            return dbRes[0];
        }
    })
}

async function auth_middleware(req,res,next){
    const token = req.body.token ? req.body.token : req.query.token;
    if (!token){
        res.json({
            success: false,
            message: "No token"
        })
        return
    }
    const user = await get_user_from_token(token)
    if (!user){
        res.json({
            success: false,
            message: "Wrong token"
        })
        return
    }
    res.locals.user = user;
    next()
}

async function admin_middleware(req,res,next){
    if (res.locals.user.type !== "admin"){
        res.json({
            success: false,
            message: "Not admin"
        })
        return
    }
    next()
}

module.exports = {get_auth_url,get_email_from_at, get_token_for_email, auth_middleware, admin_middleware}