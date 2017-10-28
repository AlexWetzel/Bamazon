# Bamazon

Bamazon is an online store application that runs in the command line. This application runs using node.js and stores data in a MySQL database.

There are two separate applications:

* bamazonCustomer.js: The application to be used by the customer. Shows a table of the store's products. The customer can choose an item and order as many as they like, up to the available stock.

* bamazonManager.js: The application to be used by the manager. When run, it will display four options:

	* View Products for sale: Displays the table of products

	* View Low Inventory: Displays a table of products where the stock is less than five

	* Add to Inventory: Prompts the manager to add more stock of any store item

	* Add New Product: Prompts the manager to add a new product to the store

## BamazonCustomer.js

Open the command line and navigate to the bamazon directory. To run bamazonCustomer.js, type 'node bamazonCustomer.js'.

--picture here--

The app prompts you to enter the ID for the item you want. The ID is the number in the first column. Enter the number corresponding to a product.

--picture here--

The next promt asks how many of the selected product you want. Enter a number greater than zero up to and including the current stock of the selected item.


Once you hit enter, a message prints your order information, including the total charge. The quantity of product ordered is removed from the stock. We can see this when we restart the app.

## BamazonManager.js

In the bamazon directory in the command line, type 'node bamazonManager.js' to run the app.

--pic--

The app will display four options. Enter the option number to execute that function. Once the function is complete, the program will prompt the user again.

### View Products for Sale

This option displays the products table.

--pic--

### View Low Inventory

This option displays a table of products that have less than 5 units in stock.

--pic--

### Add to Inventory

This option will prompt the user for the ID of an item to be restocked. Then it will prompt the quantity of product to order. Upon entering the values, the database is updated with the new stock, and a confirmation message is displayed.

--pic--

### Add New Product

This option adds a brand new product to the store. The app prompts the user for the item name, price, department, and quantity. Once these are entered, a new row is added with in the database with the new item's information. A confirmation is displayed if this is successful.

--pic--