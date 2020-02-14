
function cow_price(req, res){
    const commonId = req.params.id;
    db.Config.findAll({
		attributes: ['cowPrice'], 
		where: {id: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			res.json({success: false, message: "There's no common found to change config"})
		}
		else {
			res.json({success: true, data: dbRes})
		}
	})
}

function milk_time(req, res){
    const commonId = req.params.id;
    db.Config.findAll({
		attributes: ['milkTime'], 
		where: {id: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			res.json({success: false, message: "There's no common found to change config"})
		}
		else {
			res.json({success: true, data: dbRes})
		}
	})

}

/*
* Working on global_health 
*/
function global_health(req, res){
    const commonId = req.params.id;
	db.Cows.findAll({
        attributes: [commonId, [models.sequelize.fn('AVG', models.sequelize.col('health')),'healthAvg']], 
        group: [commonId],
        order: [[models.sequelize.fn('AVG', models.sequelize.col('health')), 'DESC']]
    }).then((dbRes)=>{
		if (dbRes.length == 0) {
			res.json({success: false, message: "Could not get global health"})
		}
		else {
			res.json({success: true, data: dbRes})
		}
	})
}

function get_create_date(){

}

function get_end_date(){

}

function get_gen_info(){

}

