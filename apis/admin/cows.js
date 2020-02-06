var db = require("../../models/index");
db.Cows.sync();


/**
 * GET /cows/:common_id
 * Descrioption: Get all the cows with common id
 * Example 
 * Return {health:integer}	
**/
function get_cows_with_common_id(req, res) {
	const commonId = req.params.id;
	db.Cows.findAll({
		attributes: ['health'], 
		where: {id: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			res.json({success: false, message: "There's no cow in this common"})
		}
		else {
			res.json({success: true, data: dbRes})
		}
	})
}


/**
 * GET /cow/:id
 * Description: Get the cow with the id
 * Example:
 * Return {health:integer}
**/
function get_cow(req, res) {
	const cowId = req.params.id;
	db.Cows.findAll({
		attributes: ['health'],
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			res.json({success: true, data: dbRes[0]})
		}
		else {
			res.json({success: false, message: "No cow found"})
		}
	})
}


/** 
 * POST /cow
 * Description: Add a cow
 * Example:
 * Return:
**/
function create_cow(req, res) {
	const {
		health,
	} = res.body;
	db.Cows.build({
		health: health,
	}).save()
	res.json({success: true})
}


/**
 * PATCH /cow/:id
 * Description: update a cow
 * Example:
 * Return
**/
function update_cow_with_id(req, res) {
	const cowId = req.params.id;
	const {
		health,
	} = req.body;
	db.Cows.findAll({
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			health = dbRes[0].health
		}
		else {
			res.json({success: false, message: "No cow found"})
		}
	})
}


/**
 * DELETE /cow/:id
 * Description: Delete a cow with given id
 * Example:
 * Return
**/
function delete_cow_with_id(req, res) {
	let cowId = req.params.id;
	db.Cows.destroy({
		where: {id: cowId}
	})
	res.json({success: true})
}


module.exports = {
	get_cow,
	get_cows_with_common_id,
	create_cow,
	update_cow_with_id,
	delete_cow_with_id
};
