CREATE EVENT IF NOT EXISTS `increase_health_minute`
ON SCHEDULE
  EVERY 5 MINUTE
  COMMENT 'Increase health if lower than threshold'
  DO
  UPDATE Cows AS c SET
            health = LEAST(c.health + 0.01 - 0.01 *
                (SELECT COUNT(temp.id) FROM (SELECT * FROM Cows) AS temp WHERE temp.CommonId = c.CommonId) /
                ((SELECT maxCowPerPerson FROM Configs WHERE CommonId = c.CommonId) *
                (SELECT COUNT(*) FROM UserCommons  WHERE CommonId = c.CommonId)),100)
        WHERE
            (SELECT COUNT(temp.id) FROM (SELECT * FROM Cows) AS temp WHERE temp.CommonId = c.CommonId) /
            ((SELECT maxCowPerPerson FROM Configs WHERE CommonId = c.CommonId) *
            (SELECT COUNT(*) FROM UserCommons  WHERE CommonId = c.CommonId)) < 1
            AND c.health < 100 AND c.health > 0         

/*
max cow per person is default to 10

health = current cow health + .01 - 0.01 * (num cows in common)/(maxCowsPerPerson * number Users)

where
(num cows in common)/(maxCowsPerPerson * number Users) < 1 and c.health <100 and c.health > 0

Issue is sometimes health goes little over 100
99.999 + 0.01 - 0.01*1/20 = 100.0085

Added LEAST function to fix this

*/