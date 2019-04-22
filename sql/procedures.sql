DELIMITER $$

## for order
## order is completed after 2 days; for simulation purpose it will be 2 minutes
## order status:  0 == in progress, 1 == delivered
/*
DROP PROCEDURE IF EXISTS checkOrderStatus$$
CREATE PROCEDURE checkOrderStatus(IN in_order_id INT)
BEGIN
	DECLARE s_orderStatus TINYINT;
	DECLARE s_orderDate DATE;
    DECLARE dateDiff INT;
    DECLARE b_rollback TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR sqlexception SET b_rollback = TRUE;
    SELECT `status`, order_date INTO s_orderStatus, s_orderDate FROM `order` WHERE order_id = in_order_id;
    
    START TRANSACTION;
    ## If Order in progress
    IF s_orderStatus = 0 THEN
		SET dateDiff = timestampdiff(MINUTE, s_orderDate, now());
		IF dateDiff > 2 THEN
			UPDATE `order` SET `status` = 1 WHERE order_id = in_order_id;
        END IF;
    END IF;
    IF b_rollback THEN rollback;
    ELSE commit;
    END IF;
    
END$$
*/
## for order
## order is completed after 2 days; for simulation purpose it will be 2 minutes
## order status:  0 == in progress, 1 == delivered
DROP PROCEDURE IF EXISTS checkAllOrderStatus$$
CREATE PROCEDURE checkAllOrderStatus(IN in_user_id VARCHAR(30))
BEGIN
	DECLARE s_orderStatus TINYINT;
	DECLARE s_orderDate DATE;
    DECLARE s_orderID INT;
    DECLARE dateDiff INT;
    
    DECLARE done TINYINT DEFAULT FALSE;
    DECLARE b_rollback TINYINT DEFAULT FALSE;
    
    DECLARE order_cursor CURSOR FOR SELECT order_id, order_date, `status` FROM `order` WHERE user_id = in_user_id;
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    DECLARE CONTINUE HANDLER FOR sqlexception SET b_rollback = TRUE;
    
    START TRANSACTION;
    ## If Order in progress
    OPEN order_cursor;
    cursor_loop: LOOP
	FETCH order_cursor INTO s_orderID ,s_orderDate, s_orderStatus;
		IF done THEN 
			LEAVE cursor_loop;
		END IF;
    
		IF s_orderStatus = 0 THEN
			SET dateDiff = timestampdiff(MINUTE, s_orderDate, now());
			IF dateDiff > 2 THEN
				UPDATE `order` SET `status` = 1 WHERE order_id = s_orderID;
			END IF;
		END IF;
    
    END LOOP;
    CLOSE order_cursor;
    
    IF b_rollback THEN rollback;
    ELSE commit;
    END IF;
    
END$$



DROP PROCEDURE IF EXISTS insertToOrderItems$$
CREATE PROCEDURE insertToOrderItems(IN in_user_id VARCHAR(30), IN in_order_id INT)
BEGIN
	DECLARE done TINYINT DEFAULT FALSE;
	DECLARE p_id INT;
    DECLARE c_id INT DEFAULT (SELECT cart_id FROM cart WHERE user_id = in_user_id);
    DECLARE totalItems INT DEFAULT 0;

    DECLARE items_cursor CURSOR FOR SELECT product_id FROM cart_item WHERE cart_id = c_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN items_cursor;
    cursor_loop: LOOP
    FETCH items_cursor INTO p_id;
    IF done THEN 
		LEAVE cursor_loop;
	END IF;
    
    INSERT INTO order_item (order_id, product_id) VALUES (in_order_id,p_id);
    SET totalItems = totalItems + 1;
    
    END LOOP;
    CLOSE items_cursor;
    
    ## If there are items delete from cart
    ## Else delete the order from order;
	IF totalItems > 0 
    THEN
		DELETE FROM cart_item WHERE cart_id = c_id;
    ELSE 
		DELETE FROM `order` WHERE order_id = in_order_id;
	END IF;
END$$

DROP PROCEDURE IF EXISTS createOrder$$
CREATE PROCEDURE createOrder(IN user_id VARCHAR(30), IN order_date DATE, IN s_address VARCHAR(100), 
								IN s_city VARCHAR(45), IN s_state CHAR(2), IN s_zip DECIMAL(5,0))
BEGIN
	DECLARE b_rollback TINYINT DEFAULT FALSE;
    
	DECLARE shipping_id INT;
    DECLARE new_order_id INT;
    DECLARE CONTINUE HANDLER FOR sqlexception SET b_rollback = true;

    START TRANSACTION; 
    
    INSERT IGNORE INTO `shipping_address` (address, city, state, zip) VALUES(s_address, s_city, s_state, s_zip); 
    SET shipping_id = (SELECT s_address_id FROM shipping_address 
		WHERE address = s_address AND city = s_city AND state = s_state AND zip = s_zip LIMIT 1);
	INSERT INTO `order` (order_date, user_id, s_address_id, weight, price, `status`) 
		VALUES (order_date, user_id, shipping_id, 0, 0, 0);
    SET new_order_id = last_insert_id();
    CALL insertToOrderItems(user_id, new_order_id);
    
    IF b_rollback THEN ROLLBACK;
    ELSE COMMIT;
    END IF;
    
END$$

## for cart
## WILL REMOVE ALL ITEMS FROM CART THEN ADD ITEMS BACK AGAIN
DROP PROCEDURE IF EXISTS addItemsToCart$$
CREATE PROCEDURE addItemsToCart(IN in_cart_id INT, IN in_product_id INT, IN in_quantity INT UNSIGNED)
BEGIN
	
	DECLARE i INT DEFAULT in_quantity;
	DECLARE stock INT DEFAULT (SELECT quantity FROM product WHERE product_id = in_product_id); 
    DECLARE b_rollback TINYINT DEFAULT FALSE;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET b_rollback = true; 
    START TRANSACTION;
    
    CALL removeAllItemsFromCart(in_cart_id, in_product_id);
    
    IF in_quantity <= stock THEN
		WHILE i > 0 DO
			INSERT INTO cart_item (cart_id, product_id) VALUES (in_cart_id, in_product_id);
			SET i = i - 1;
		END WHILE;
    
	UPDATE product SET product.quantity = product.quantity - in_quantity WHERE product_id = in_product_id;
    END IF;
    
    IF b_rollback THEN rollback;
    ELSE commit;
    END IF;
    
END$$ 


## REMOVE ALL FROM CART AND ADD THEM BACK TO PRODUCT
## Will only remove items with the same product_id from cart that has cart_id;
DROP PROCEDURE IF EXISTS removeAllItemsFromCart$$
CREATE PROCEDURE removeAllItemsFromCart(IN in_cart_id INT, IN in_product_id INT)
BEGIN
	DECLARE quantity INT;
    DECLARE b_rollback TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET b_rollback = true;
    START TRANSACTION;
    
    SET quantity = (SELECT count(*) FROM cart_item WHERE cart_id = in_cart_id AND product_id = in_product_id);
    DELETE FROM cart_item WHERE cart_id = in_cart_id AND product_id = in_product_id;
	UPDATE product SET product.quantity = product.quantity + quantity WHERE product_id = in_product_id;
    
	IF b_rollback THEN rollback;
    ELSE commit;
    END IF;
    
END$$
DELIMITER ;

