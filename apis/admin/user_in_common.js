/*
User can have different wealth in different commons

*/

function get_user_wealth(userId, cId){
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: {id: userID, commonsId: cId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}