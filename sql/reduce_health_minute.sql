CREATE EVENT IF NOT EXISTS `reduce_health_minute`
ON SCHEDULE
  EVERY 5 MINUTE
  COMMENT 'Reduce health if lower than threshold'
  DO
    UPDATE Cows AS c SET
            health = c.health + 0.001 - 0.01 *
                (SELECT COUNT(temp.id) FROM (SELECT * FROM Cows) AS temp WHERE temp.CommonId = c.CommonId) /
                ((SELECT maxCowPerPerson FROM Configs WHERE CommonId = c.CommonId) *
                (SELECT COUNT(*) FROM UserCommons  WHERE CommonId = c.CommonId))
        WHERE
            (SELECT COUNT(temp.id) FROM (SELECT * FROM Cows) AS temp WHERE temp.CommonId = c.CommonId) /
            ((SELECT maxCowPerPerson FROM Configs WHERE CommonId = c.CommonId) *
            (SELECT COUNT(*) FROM UserCommons  WHERE CommonId = c.CommonId)) > 1
            AND c.health <= 100 AND c.health > 0

