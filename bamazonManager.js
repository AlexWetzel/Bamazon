//required npm packages
var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require('inquirer');
//object to store the connection information
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "RootPass",
	database: "bamazon"
});
//Defines how the table is built
var tableSpecs = {
	    head: ['item ID', 'product name', 'department', 'price', 'quantity']
	  , colWidths: [9, 60, 16, 8, 10]
	}

//Displays the entire products table
function displayStock() {
	var table = new Table(tableSpecs);

	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		//Pass each object key into the table object to create a row. Repeat for all rows
		for (var i = 0; i < res.length; i++) {
			table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
		}
		console.log(table.toString());
		promptManager();
	});
};
//Displays every product with a stock less than 5
function displayLowStock() {
	var table = new Table(tableSpecs);

	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
		if (err) throw err;
		//If no products have a stock less than 5
		if (res.length === 0) {
			console.log("\nInventory is sufficiently stocked\n")
		}
		else {
			for (var i = 0; i < res.length; i++) {
				table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
			}
			console.log(table.toString());
		}
		promptManager();
	});
}
//Adds to a product's stock
function orderStock() {
	var itemID = 0;
	var orderQty = 0;
	inquirer.prompt([
		{
			type: "input",
			name: "itemID",
			message: "Select the item ID for the product you want to order."
		},
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to order?"
		}		
	]).then(function (answers) {
		itemID = answers.itemID;
		orderQty = answers.quantity;
		
		connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",[orderQty, itemID] ,function(err, res) {
			if (err) throw err;

			console.log("You ordered " + orderQty + " of item #: " + itemID);
			promptManager();
		});
	});
};
//Adds a new item to the produsts table
function addNewProduct() {
	//Prompts the user for the item's name, its price, the department it belongs to, and how many will be stocked 
	inquirer.prompt([
		{
			type: "input",
			name: "newItem",
			message: "What would you like to add to your inventory?"
		},
		{
			type: "input",
			name: "price",
			message: "What is the retail price of this product?"
		},
		{
			type: "input",
			name: "department",
			message: "Which department will this product be listed under?"
		},
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to order?"
		}		
	]).then(function (answers) {
		var newItem = answers.newItem;
		var orderQty = answers.quantity;
		var price = answers.price;
		var dept = answers.department;
		//Query to insert the values to the table
		connection.query(
			"INSERT products (product_name, department_name, price, stock_quantity)" + 
			"VALUE (?, ?, ?, ?)", [newItem, dept, price, orderQty], function(err, res){
			if (err) throw err;

			console.log("\nSuccessfully ordered " + orderQty + " of item: " + newItem + "\n");
			promptManager();
		});
	});
}
//Displays options for the manager to select
var promptManager = function() {
	//Prompts the user to select one of 4 options
	inquirer.prompt(
		{
			type: "rawlist",
			name: "choice",
			message: "What would you like to do?",
			choices: [
				"View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product"
			]
		}	
	).then(function (answer) {
		//The option the user selects will call a specific function
		switch (answer.choice) {
			case "View Products for Sale":
				displayStock();
				break;
			case "View Low Inventory":
				displayLowStock();
				break;
			case "Add to Inventory":
				orderStock();
				break;
			case "Add New Product":
				addNewProduct();
				break;
		}
	});
}
//Starts the connection to the server. If successful, displays the stock and prompts the user
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayStock();
});