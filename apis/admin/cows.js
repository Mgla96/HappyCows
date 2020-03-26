var db = require("../../models/index");
const { QueryTypes } = require('sequelize');

db.Cows.sync();


/**
 * GET /cows/:common_id
 * Description: Get all the cows with common id
 * Example 
 * Return {health:integer}	
**/
function get_cows_with_common_id(commonId) {
	db.Cows.findAll({
		attributes: ['id','health'], 
		where: {CommonId: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			return true, dbRes
		}
	})
}

/**
 * GET /cow/:id
 * Description: Get the cow with the id
 * Example:
 * Return {health:integer}
**/
function get_cow(cowId) {
	db.Cows.findAll({
		attributes: ['health'],
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

/** 
 * POST /cow
 * Description: Add a cow
 * Example:
 * Return:
**/
function create_cow(health) {
	db.Cows.build({
		health: health,
		status: "status"
	}).save()
	return true;
}


/**
 * PATCH /cow/:id
 * Description: update a cow
 * Example:
 * Return
**/
function update_cow_with_id(cowId, health) {
	db.Cows.findAll({
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			dbRes[0].health = health;
			dbRes[0].save();
			return true;
		}
		else {
			return false;
		}
	})
}

/*
* 
* Description: Place cow with cowId into commons with commonId
*
*/
function update_cow_into_common(cowId, commonId, uId){
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


/**
 * DELETE /cow/:id
 * Description: Delete a cow with given id
 * Example:
 * Return
**/
function delete_cow_with_id(cowId) {
	db.Cows.destroy({
		where: {id: cowId}
	})
	return true;
}


/*
Total cows of a current user in a commons
*/
async function get_cow_total(cId, uId) {
	return await db.sequelize.query(
		'SELECT COUNT(c.id) ' +
		`FROM Cows AS c `+
		'WHERE c.UserId = ' + uId +
		' AND c.CommonId = ' + cId  ,
		{

			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			console.log("total cows: " + sol);
			if(sol==null){
				return 0;
			}
			else{
				return sol;
			}		
		});
}




module.exports = {
	get_cow,
	get_cows_with_common_id,
	create_cow,
	update_cow_with_id,
	delete_cow_with_id,
	get_cow_total
};
