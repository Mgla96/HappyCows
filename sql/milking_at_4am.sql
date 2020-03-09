CREATE EVENT IF NOT EXISTS `milking_at_4am`
ON SCHEDULE
  EVERY 4 DAY_HOUR
  COMMENT 'Milk the cows at 4AM everyday'
  DO
    INSERT INTO UserWealths (wealth, CommonId, UserId, createdAt, updatedAt)
        SELECT
            (SELECT milkPrice FROM Configs) AS wealth,
            CommonId,
            UserId,
            createdAt,
            updatedAt FROM Cows
