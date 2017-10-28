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
//Variable storing the table data
var table = new Table({
    head: ['item ID', 'product name', 'department', 'price', 'quantity']
  , colWidths: [9, 60, 16, 8, 10]
});
//Variables to store order information
var itemID = 0;
var orderQty = 0;
var itemName = "";
var price = 0;
var stock = 0;
//Displays the product table in the console, then prompts the user
function displayStock() {
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		//Pass each object key into the table object to create a row. Repeat for all rows
		for (var i = 0; i < res.length; i++) {
			table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
		}
		console.log(table.toString());
		promptCustomer(res);
	});
};
//Prompts the user for a their desired product's ID, and the quantity they want to purchase
function promptCustomer(res) {
	inquirer.prompt([
	{
		type: "input",
		name: "itemID",
		message: "Select the item ID for the product you want."
	},
	{
		type: "input",
		name: "quantity",
		message: "How many would you like to purchase?"
	}		
		]).then(function (answers) {
		//Stores the data of the user's chosen item to be used later
		itemID = answers.itemID;
		orderQty = answers.quantity;
		var item = res[itemID - 1];
		itemName = item.product_name;
		price = item.price;
		stockQty = item.stock_quantity;
   
		placeOrder();
	});
};
//Checks if the order quantity is valid, updates the table, and displays the charge amount
function placeOrder(newQty) {
	//If the order quantity isn't valid, the program ends
	if (orderQty > stockQty) {
		console.log("Ordered too much. Order canceled")
		connection.end();
		return
	}
	else if (orderQty < 0) {
		console.log("No returns!")
		connection.end();
		return
	}
	else if (orderQty === 0) {
		console.log("Order canceled")
	}
	//Updates the database to reflect the purchased stock
	connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[orderQty, itemID] ,function(err, res) {
		if (err) throw err;
		//If the database successfully updates, the user is shown the chrarge amount of their order
		var charge = orderQty * price;
		charge = charge.toFixed(2);
		console.log("You ordered " + orderQty + " of item: " + itemName);
		console.log("Your total is: $" + charge);
		connection.end();
	});
};
//Starts the connection to the server. If successful, displays the stock
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	displayStock();
});       