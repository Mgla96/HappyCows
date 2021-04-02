CREATE EVENT IF NOT EXISTS `kill_cows_minute`
ON SCHEDULE
  EVERY 10 MINUTE
  COMMENT 'Kill cows every 10 minute for having no health'
  DO
    DELETE FROM Cows WHERE c.health <= 0
