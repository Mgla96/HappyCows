var db = require("../../models/index");
db.Cows.sync();

function update_self(req, res){
    const {
        firstName, 
        lastName, 
    } = req.body;
    
    let currentRes = res.locals.user;
    currentRes.firstName = firstName;
    currentRes.lastName = lastName;
    currentRes.save();
    res.json({success: true})
}

function get_user_wealth(req, res) {
    
    //calls function from user_in_commons
    
    
}

function get_user_day_profit(req, res){

}
function buy_cow(req, res){

}

function sell_cow(req, res){

}

function get_cow_total(req, res){
    
}

function set_cows_on_pasture(req, res) {
    
}
