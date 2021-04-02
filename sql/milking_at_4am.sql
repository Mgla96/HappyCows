CREATE EVENT IF NOT EXISTS `milking_at_4am`
ON SCHEDULE
  EVERY 4 DAY_HOUR
  COMMENT 'Milk the cows at 4AM everyday'
  DO
    INSERT INTO UserWealths (wealth, type, createdAt, updatedAt, CommonId, UserId)
        SELECT
            (SELECT milkPrice FROM Configs AS conf WHERE conf.CommonId = cw.CommonId) *
            (1-(SELECT tax FROM TieredTaxings AS t INNER JOIN
                Configs AS c ON c.Id = t.ConfigId WHERE c.CommonId = cw.CommonId) / 100)
            AS wealth,
            "milk" AS `status`,
            CURRENT_TIMESTAMP AS createdAt,
            CURRENT_TIMESTAMP AS updatedAt,
            CommonId,
            UserId FROM Cows AS cw


/*
Note: Day_Hour not working for 4 am only. It is being called twice a day so using Every 1 Day and setting start time to 4 am
*/
