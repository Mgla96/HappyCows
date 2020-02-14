function get_user_wealth(req, res){
    const userID = req.params.id;
	db.User_Wealth.findAll({
		attributes: ['wealth'],
		where: {id: userID}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			res.json({success: true, data: dbRes[0]})
		}
		else {
			res.json({success: false, message: "No user found"})
		}
	})
}