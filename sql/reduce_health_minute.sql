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
            AND c.health > 0

/*
health reduced every 5 minutes

12 times per hour
288 times per day

c.health + 0.001 - .01*(num cows in common)/(maxCowsPerPerson * number Users) 

say (num cows in common)/(maxCowsPerPerson * number Users) > 1


11/(10*1) = 1.1

.001-(.01)(1.1) = -0.01 lost in health every 5 minutes
Which translates to 2.88 lost in health per day
so it will take 34.7 days to have cows all go to 0 if num cows in common stay same


20/(10*1)=2

.001 - (0.01)(2) = -0.019 lost in health every 5 minutes
Which translates to 5.272 lost in health per day
so it will take 18 days to have cows all go to 0 if num cows in common stay same

30/(10*1)=3

.001- (0.01)(3) = -0.029 lost in health every 5 minutes
which translates to 8.352 lost per day
so it will take 11.97 days to have cows all go to 0 if num cows in common stay same 

*/