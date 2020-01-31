function get_user(req, res) {
  res.json({})
}

function get_users_with_id(req, res) {
  let user_id = req.params.id
  res.json({})
}

export default { get_user, get_users_with_id };
