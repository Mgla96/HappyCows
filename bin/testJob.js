#!/usr/bin/env node

console.log("This is a test job");
const env = process.env.NODE_ENV || 'development';

console.log(`env=${env}`);
var db = require("../models/index")
var {get_wealth, get_cows} = require("../utils/sql")
const { QueryTypes } = require('sequelize');


console.log(`db=${db}`);

function get_users_in_common(commonId){
	return db.sequelize.query(
		'SELECT u.id, u.firstName, u.lastName, u.email, u.type, ' +
		`(${get_wealth} u.id AND CommonId = ?) AS wealth, ` +
		`(${get_cows} u.id AND CommonId = ?) AS cows ` +
		'FROM UserCommons AS uc JOIN Users AS u ON u.id = uc.UserId  WHERE uc.CommonId = ? ', 
		{
			replacements: [
				commonId,commonId,commonId
			],
			type: QueryTypes.SELECT
		}).then((dbRes)=>{
		return dbRes;
	});
}

const result = get_users_in_common('121');
console.log(`result=${result}`);
