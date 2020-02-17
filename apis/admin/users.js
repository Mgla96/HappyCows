var db = require("../../models/index")
var paging = require("../../utils/pagination")
const uuidv1 = require('uuid/v1');

db.Users.sync();

// GET /user
// Description: Get users, pagination enabled
// Example: curl -X GET /admins/users?page=1
// Return {firstName:string, lastName:string, email:string, type:string}
function get_users(req, res) {
  db.Users.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    ...paging(req),
  }).then((dbRes)=>{
    res.json({success: true, data: dbRes})
  })
}

// GET /user/:id
// Description: Get a specific user with id
// Example: curl -X GET /admins/user/1
// Return {firstName:string, lastName:string, email:string, type:string}
function get_users_with_id(req, res) {
  const userId = req.params.id;
  db.Users.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    where: { id: userId }
  }).then((dbRes)=>{
    if (dbRes.length == 1){
      res.json({success: true, data: dbRes[0]})
    } else {
      res.json({success: false, message: "No user found"})
    }
  })
}

// POST /user
// Description: Create a new user
// Example: curl -X POST /admins/user --data "firstName=abc&lastName=abc&email=abc&type=admin"
// Return 
function create_user(req, res) {
  const {
    firstName, 
    lastName, 
    email,
    type,
  } = req.body;
  token = uuidv1();
  db.Users.build({
      firstName: firstName,
      lastName: lastName,
      email: email,
      type: type,
      token: token
    }).save()
  res.json({success: true})
}

// PATCH /user/:id
// Description: Update a specific user with id
// Example: curl -X PATCH /admins/user/1 --data "firstName=abc&lastName=abc&email=abc&type=admin"
// Return 
function update_users_with_id(req, res) {
  const userId = req.params.id;
  const {
    firstName, 
    lastName, 
    email,
    type,
  } = req.body;
  db.Users.findAll({
    where: { id: userId }
  }).then((dbRes)=>{
    if (dbRes.length == 1){
      let currentRes = dbRes[0];
      currentRes.firstName = firstName;
      currentRes.lastName = lastName;
      currentRes.email = email;
      currentRes.type = type;
      currentRes.save();
    } else {
      res.json({success: false, message: "No user found"})
    }
  })
  res.json({success: true})
}

// DELETE /user/:id
// Description: Delete a specific user with id
// Example: curl -X DELETE /admins/user/1
// Return 
function delete_users_with_id(req, res) {
  let userId = req.params.id;
  db.Users.destroy({
    where: { id: userId }
  })
  res.json({success: true})
}

// GET /user/:id
// Description: Delete a specific user with id
// Example: curl -X DELETE /admins/user/1
// Return 
function does_user_exist(req, res) {
  const userId = req.params.id;
  db.Users.findAll({
    where: { id: userId }
  }).then((dbRes)=>{
    if (dbRes.length == 1){
      res.json({success: true, message: "User exists"})
    } else {
      res.json({success: false, message: "No user found"})
    }
  })
  res.json({success: true})
}





module.exports = { 
  get_users, 
  get_users_with_id, 
  create_user,
  update_users_with_id,
  delete_users_with_id
};
