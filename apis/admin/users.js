var db = require("../../models/index")
var paging = require("../../utils/pagination")
const uuidv1 = require('uuid/v1');
db.Users.sync();

// GET /user
// Description: Get users, pagination enabled
// Example: curl -X GET /admins/users?page=1
// Return {firstName:string, lastName:string, email:string, type:string}
function get_users(req) {
  db.Users.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    ...paging(req),
  }).then((dbRes)=>{
    return dbRes;
  })
}

// GET /user/:id
// Description: Get a specific user with id
// Example: curl -X GET /admins/user/1
// Return {firstName:string, lastName:string, email:string, type:string}
function get_users_with_id(userId) {
  db.Users.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    where: { id: userId }
  }).then((dbRes)=>{
    if (dbRes.length == 1){
      return true, dbRes[0]
    } else {
      return false, null
    }
  })
}

// POST /user
// Description: Create a new user
// Example: curl -X POST /admins/user --data "firstName=abc&lastName=abc&email=abc&type=admin"
// Return 
function create_user(firstName, 
  lastName, 
  email,
  type) {
  token = uuidv1();
  db.Users.build({
      firstName: firstName,
      lastName: lastName,
      email: email,
      type: type,
      token: token
    }).save()
  return true;
}

// PATCH /user/:id
// Description: Update a specific user with id
// Example: curl -X PATCH /admins/user/1 --data "firstName=abc&lastName=abc&email=abc&type=admin"
// Return 
function update_users_with_id(userId, firstName, 
  lastName, 
  email,
  type,) {
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
      return false
    }
  })
  return true
}

// DELETE /user/:id
// Description: Delete a specific user with id
// Example: curl -X DELETE /admins/user/1
// Return 
function delete_users_with_id(userId) {
  db.Users.destroy({
    where: { id: userId }
  })
  return true;
}

// GET /user/:id
// Description:
// Example: 
// Return 
function does_user_exist(userId) {
  db.Users.findAll({
    where: { id: userId }
  }).then((dbRes)=>{
    if (dbRes.length == 1){
      return false;
    } else {
      return true;
    }
  })
  return false
}


module.exports = { 
  get_users, 
  get_users_with_id, 
  create_user,
  update_users_with_id,
  delete_users_with_id
};
