module.exports = async (req, res)=>{
    const user_obj = res.locals.user; 
    res.render('error');
}