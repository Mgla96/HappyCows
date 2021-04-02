CREATE EVENT IF NOT EXISTS `health_at_5am`
ON SCHEDULE
  EVERY 5 DAY_HOUR
  COMMENT 'Posts to a table the avg cow health for all active commons at 5am. Allows us to print graphs of change in health of cows in common over time'
  DO
    INSERT INTO CommonsHealths (health, createdAt, updatedAt, CommonId)
        SELECT
            (SELECT AVG(c.health) FROM Cows AS c WHERE c.CommonId = CommonId) 
            AS health,
            CURRENT_TIMESTAMP as createdAt,
            CURRENT_TIMESTAMP as updatedAt,
            CommonId FROM Cows

/*
Note: Day_Hour not working for 5 am only. It is being called twice a day so using Every 1 Day and setting start time to 5 am
*/
