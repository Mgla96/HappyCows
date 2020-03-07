module.exports = {
    get_wealth: "SELECT SUM(wealth) FROM UserWealths WHERE UserId = ",
    get_cows: "SELECT COUNT(wealth) FROM Cows WHERE UserId = "
};