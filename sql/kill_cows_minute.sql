CREATE EVENT IF NOT EXISTS `kill_cows_minute`
ON SCHEDULE
  EVERY 1 MINUTE
  COMMENT 'Kill cows every minute for having no health'
  DO
    DELETE FROM Cows WHERE c.health <= 0
