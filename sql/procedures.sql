DELIMITER $$

DROP PROCEDURE IF EXISTS insertToOrderItems$$
CREATE PROCEDURE insertToOrderItems()
BEGIN


END$$

DROP PROCEDURE IF EXISTS createOrder$$
CREATE PROCEDURE createOrder(IN user_id VARCHAR(30), IN s_address VARCHAR(100), 
								IN s_city VARCHAR(45), IN s_state CHAR(2), IN s_zip DECIMAL(5,0))
BEGIN
	DECLARE shipping_id INT;
    INSERT IGNORE INTO `shipping_address` (address, city, state, zip) VALUES(s_address, s_city, s_state, s_zip); 
    SET shipping_id = (SELECT s_address_id FROM shipping_address 
		WHERE address = s_address AND city = s_city AND state = s_state AND zip = s_zip LIMIT 1);
    SELECT shipping_id;
END$$

DELIMITER ;

