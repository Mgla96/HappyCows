CREATE EVENT IF NOT EXISTS `kill_cows_minute`
ON SCHEDULE
  EVERY 1 MINUTE
  COMMENT 'Kill cows every minute for having no health'
  DO
    UPDATE Cows AS c SET c.status = "dead"
    WHERE c.health <= 0
