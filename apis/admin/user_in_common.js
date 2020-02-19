function get_user_wealth(userId){
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: {id: userID}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}