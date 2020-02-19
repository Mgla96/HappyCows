const express = require('express');
const path = require('path');
const app = express();
app.use( express.static( "public" ) );


app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');
// app.get('/:userQuery',(req,res)=>{
//     res.render('index',{data : {userQuery: req.params.userQuery,
//                                searchResults : ['book1','book2','book3'],
//                                loggedIn : true,
//                                username : 'lkjslkjdf'}});
// });


app.get('/user_main',(req,res)=>{
    res.render('user_main',{data : {userCows: 4,
                                    userName: 'testuser1',
                                    userMoney: 420,
                                    userCowsHealth: 69    
                                    }});
});

app.get('/admin',(req,res)=>{
    res.render('admin_main',{data : {commons: [['commons01', 69, 420],
                                               ['commons02', 0, 100]]
                                            }});
});

app.get('/admin_commons',(req,res)=>{
    res.render('admin_commons',{data : {users: [['user01', 11111, 'email',10,45,250],
                                               ['user02', 00000, 'email02',11,78,1000]],
                                        taxes:[[0,10,10],
                                               [11,25,15]]
                                }});
});



app.listen(3000);