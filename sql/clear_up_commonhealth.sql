CREATE EVENT IF NOT EXISTS `clear_up_commonhealth`
ON SCHEDULE
  EVERY 4 DAY_HOUR
  COMMENT 'clears rows from commonhealths for deleted commons weekly'
  DO
    INSERT INTO CommonsHealths (health, createdAt, updatedAt, CommonId)
        SELECT
            (SELECT AVG(c.health) FROM Cows AS c WHERE c.CommonId = CommonId) 
            AS health,
            CURRENT_TIMESTAMP AS createdAt,
            CURRENT_TIMESTAMP AS createdAt,
            CommonId FROM Cows

DELETE ch
FROM
  CommonsHealths ch
WHERE
  CommonId is null