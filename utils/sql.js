module.exports = {
    get_wealth: "SELECT SUM(wealth) FROM UserWealths WHERE UserId = ",
    get_cows: "SELECT COUNT(wealth) FROM Cows WHERE UserId = ",
    get_health: "SELECT AVG(health) FROM Cows WHERE CommonId = ",
    get_players: "SELECT COUNT(*) FROM UserCommons WHERE CommonId = "
};