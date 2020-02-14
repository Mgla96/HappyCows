var db = require("../../models/index");
db.Cows.sync();

/**
 * Don't need because get_cow in admin cows returns health
 * 
 **/
function get_cow_health(req, res ) {
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