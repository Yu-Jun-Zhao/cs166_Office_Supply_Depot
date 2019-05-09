
DELIMITER $$
## USER
DROP TRIGGER IF EXISTS AFTER_CREATE_USER$$
CREATE TRIGGER AFTER_CREATE_USER 
	AFTER INSERT ON customer
    FOR EACH ROW
	BEGIN
		INSERT INTO cart(user_id) VALUES (NEW.user_id);
    END$$

## ORDER ITEMS
DROP TRIGGER IF EXISTS AFTER_INSERT_ORDERITEM$$
CREATE TRIGGER AFTER_INSERT_ORDERITEM
	AFTER INSERT ON order_item
    FOR EACH ROW
    BEGIN
		DECLARE l_weight DECIMAL(8,4);
        DECLARE l_price DECIMAL(6,2);
        DECLARE l_quantity INT UNSIGNED;
        SELECT weight, price INTO l_weight, l_price FROM product WHERE product_id = NEW.product_id LIMIT 1;
        
        UPDATE `order` SET `order`.weight = `order`.weight + l_weight * NEW.quantity 
					, `order`.items_price = `order`.items_price + l_price  * NEW.quantity
                    WHERE order_id = NEW.order_id;
    END$$

DELIMITER ;