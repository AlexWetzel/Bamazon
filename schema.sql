DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("A Box of Biscuits", "Food", "2.99", "37"),
	("A Box of Mixed Biscuits", "Food", "3.99", "15"),
	("A Biscuit Mixer", "Home", "19.99", "14"),
	("Toy Boat", "Toys", "9.99", "31"),
	("Sea Shells She Sells by the Sea Shore", "Junk", "40.00", "16");

SELECT * FROM products;