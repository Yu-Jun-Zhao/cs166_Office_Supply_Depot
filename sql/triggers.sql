
DELIMITER $$
## USER
DROP TRIGGER IF EXISTS AFTER_CREATE_USER$$
CREATE TRIGGER AFTER_CREATE_USER 
	AFTER INSERT ON customer
    FOR EACH ROW
	BEGIN
		INSERT INTO cart(user_id) VALUES (NEW.user_id);
    END$$
    
##CARTITEMS
DROP TRIGGER IF EXISTS BEFORE_INSERT_CARTITEM$$
CREATE TRIGGER BEFORE_INSERT_CARTITEM
	BEFORE INSERT ON cart_item
    FOR EACH ROW
    BEGIN
		UPDATE product SET product.quantity = product.quantity - 1 WHERE product.product_id = NEW.product_id;
    END$$

DROP TRIGGER IF EXISTS AFTER_DELETE_CARTITEM$$
CREATE TRIGGER AFTER_DELETE_CARTITEM
	AFTER DELETE ON cart_item
    FOR EACH ROW
    BEGIN 
		UPDATE product SET product.quantity = product.quantity + 1 WHERE product.product_id = OLD.product_id;
    END$$

## ORDER ITEMS
DROP TRIGGER IF EXISTS AFTER_INSERT_ORDERITEM$$
CREATE TRIGGER AFTER_INSERT_ORDERITEM
	AFTER INSERT ON order_item
    FOR EACH ROW
    BEGIN
		DECLARE l_weight DECIMAL(8,4);
        DECLARE l_price DECIMAL(6,2);
        SELECT weight, price INTO l_weight, l_price FROM product WHERE product_id = NEW.product_id LIMIT 1;
        
        UPDATE `order` SET `order`.weight = `order`.weight + l_weight 
					, `order`.price = `order`.price + l_price 
                    WHERE order_id = NEW.order_id;
    END$$

DELIMITER ;