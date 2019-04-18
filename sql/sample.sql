INSERT INTO cart(Customer_user_id) VALUES(100);

DELETE FROM customer WHERE user_id = "aaa356";

UPDATE customer SET user_id="testingsjdlajdlwa" WHERE user_id="testing";

DROP DATABASE osd;

## DEBUG
INSERT INTO Cart_Item (cart_id, product_id) VALUES (13213,12313);
DELETE FROM Cart_Item WHERE item_id = 2313213;
CALL createOrder("testing","1 Washington", "San Jose", "CA", 9222202);


## EXAMPLE QUERIES FOR DB
INSERT INTO customer (user_id, first_name, last_name) VALUES ("aaa356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;
INSERT INTO customer (user_id, first_name, last_name) VALUES ("bbb356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;
INSERT INTO customer (user_id, first_name, last_name) VALUES ("ccc356", "test2", "test") ON DUPLICATE KEY UPDATE user_id = user_id;

INSERT INTO Cart_Item (cart_id, product_id) VALUES (1,2);
DELETE FROM Cart_Item WHERE item_id = 2;

CALL createOrder("aaa356",CURDATE(),"1 Washington", "San Jose", "CA", 92202);
CALL createOrder("bbb356", CURDATE(),"testing at testing", "San Jose", "CA", 92202);
CALL createOrder("ccc356",CURDATE(),"testing at testing2", "San Jose", "CA", 92202);
CALL createOrder("aaa356",CURDATE(),"testing at testing3", "San Jose", "CA", 92202);


