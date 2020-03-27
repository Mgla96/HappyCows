const {get_cow_total, get_user_wealth} = require("../apis/users/index");
/*
redirects to choose commons page. Main User Page routing is in user_commons.js
*/

module.exports = async(req, res)=>{
   res.redirect("/choosecommons/");
}
