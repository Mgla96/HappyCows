CREATE EVENT IF NOT EXISTS `milking_at_4am`
ON SCHEDULE
  EVERY 4 DAY_HOUR
  COMMENT 'Milk the cows at 4AM everyday'
  DO
    INSERT INTO UserWealths (wealth, type, createdAt, updatedAt, CommonId, UserId)
        SELECT
            (SELECT milkPrice FROM Configs AS conf WHERE conf.CommonId = cw.CommonId) *
            (SELECT tax FROM TieredTaxings AS t INNER JOIN
                Configs AS c ON c.Id = t.ConfigId WHERE c.CommonId = cw.CommonId) / 100
            AS wealth,
            "milk" AS `status`,
            createdAt,
            updatedAt,
            CommonId,
            UserId FROM Cows AS cw