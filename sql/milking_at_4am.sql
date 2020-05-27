CREATE EVENT IF NOT EXISTS `milking_at_4am`
ON SCHEDULE
  EVERY 4 DAY_HOUR
  COMMENT 'Milk the cows at 4AM everyday'
  DO
    INSERT INTO UserWealths (wealth, type, createdAt, updatedAt, CommonId, UserId)
        SELECT
            (SELECT milkPrice FROM Configs AS conf WHERE conf.CommonId = cw.CommonId) *
            (1-(SELECT tax FROM TieredTaxings AS t INNER JOINConfigs AS c ON c.Id = t.ConfigId WHERE c.CommonId = cw.CommonId) / 100)
            AS wealth,
            "milk" AS `status`,
            createdAt,
            updatedAt,
            CommonId,
            UserId FROM Cows AS cw

          

/*
milkPrice default is 10
tax default is 10

milkPrice * 1-taxprcnt

10 * 1-(10/100)

what about cow health in this equation?
maybe multiply milk profit by cow health percentage
if cow health 50% than only 50% of profit from milking because will not provide as much milk

save this for future implementation
*/