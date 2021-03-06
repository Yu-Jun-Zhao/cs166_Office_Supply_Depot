INSERT INTO cart(Customer_user_id) VALUES(100);

DELETE FROM customer WHERE user_id = "aaa356";

UPDATE customer SET user_id="testingsjdlajdlwa" WHERE user_id="testing";

DROP DATABASE osd;

## DEBUG
INSERT INTO Cart_Item (cart_id, product_id) VALUES (13213,12313);
DELETE FROM Cart_Item WHERE item_id = 2313213;
CALL createOrder("testing","1 Washington", "San Jose", "CA", 9222202);
CALL removeAllItemsFromCart(3,3);


## EXAMPLE QUERIES FOR DB
INSERT INTO customer (user_id, first_name, last_name) VALUES ("aaa356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;
INSERT INTO customer (user_id, first_name, last_name) VALUES ("bbb356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;
INSERT INTO customer (user_id, first_name, last_name) VALUES ("ccc356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;

##INSERT INTO Cart_Item (cart_id, product_id) VALUES (1,2);
##INSERT INTO Cart_Item (cart_id, product_id) VALUES (2,1);
##INSERT INTO Cart_Item (cart_id, product_id) VALUES (3,1);

UPDATE product SET p_name = "Ticonderoga The World Best Pencils", weight = 12, quantity = 20, price = 0.5, 
	`description` = "testing", imgPath = "www.google.com"
 WHERE product_id = 1;

CALL addItemsToCart(1,2,20);
CALL addItemsToCart(1,2,5);

CALL addItemsToCart(2,2,7);
CALL addItemsToCart(2,17,15);
CALL addItemsToCart(3,1,3);

CALL removeAllItemsFromCart(1,2);
CALL removeAllItemsFromCart(2,1);
CALL removeAllItemsFromCart(3,1);
CALL removeAllItemsFromCart(3,3);

SELECT cart_id, product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = 1 GROUP BY product_id;
SELECT p_name FROM product WHERE product_id = 2;

CALL createOrder("aaa356",CURDATE(),"1 Washington", "San Jose", "CA", 92202, 1, 1, 2);
CALL createOrder("bbb356", CURDATE(),"testing at testing", "San Jose", "CA", 92202, 1, 1, 2);
CALL createOrder("ccc356",CURDATE(),"testing at testing2", "San Jose", "CA", 92202, 2, 2, 2);
CALL createOrder("aaa356",CURDATE(),"testing at testing3", "San Jose", "CA", 92202, 2, 2, 2);

CALL checkAllOrderStatus("aaa356");
