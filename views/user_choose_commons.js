
module.exports = (req, res)=>{
    const user_obj = res.locals.user;
    res.render('user_select_commons', {data : 
        { 
            id: 1,
            name: "Chem123-Winter2020"
        }
    }
)}
