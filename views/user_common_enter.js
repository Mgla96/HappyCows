/*
when user selects commons from choose commons page it saves the common id and redirects
that value to where game is played which uses it to render data for that specific commons 
*/
module.exports = async (req, res)=>{
    cid = req.body.cid;
    res.redirect("/play");
}
