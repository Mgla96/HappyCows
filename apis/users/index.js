var db = require("../../models/index");
db.Users.sync();
db.Cows.sync();

function update_self(firstName, lastName){  
    let currentRes = res.locals.user;
    currentRes.firstName = firstName;
    currentRes.lastName = lastName;
    currentRes.save();
    return true
}
//need user id and commons id
function get_user_wealth(cId, uId){
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: {id: uId, CommonId: cId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

//another table for user day wealth
//date, profit, user common ids
function get_user_day_profit(req, res){

}

function buy_cow(cowId, commonId, uId){
	db.Cows.findAll({
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			dbRes[0].CommonId = commonId;
			dbRes[0].UserId = uId;
			dbRes[0].save();
			return true;
		}
		else {
			return false;
		}
	})
}

/*
-remove cow from user
-get cow price (from config table) w 
and maybe selling a cow is 70% of that or so?
in future we can add this option in commons config
-add to user's wealth 
*/
function sell_cow(cowId, cId, uId){
	db.Cows.destroy({
		where: {id: cowId}
	})
	db.UserWealths.findAll({
		where: {CommonId: cId, UserId: uId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			dbRes[0].wealth += (.7 * 20); //whatever % of cow price will be (will have to call get cowprice function)
			dbRes[0].save();
			return true;
		}
		else {
			return false;
		}
	})
}

/*
Total cows of a current user in a commons
*/
function get_cow_total(cId, uId){
	//function to get current user id as uId
	db.Cows.findAll({
		attributes: {
			include: [
				[sequelize.fn('COUNT', sequelize.col('id')), 'n_cows']
			]
		},
		where: {CommonId: cId, UserId: uId}
	}).then((dbRes)=>{
		if (dbRes.length == 1){
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

