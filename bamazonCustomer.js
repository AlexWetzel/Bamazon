var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "RootPass",
	database: "bamazon"
});

var table = new Table({
    head: ['item ID', 'product name', 'department', 'price', 'quantity']
  , colWidths: [8, 60, 16, 8, 10]
});

var itemID = 0;
var orderQty = 0;
var itemName = "";
var price = 0;
var stock = 0;

function displayStock() {
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
		}
		console.log(table.toString());
		promptCustomer(res);
	});
};

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
		// console.log("This works")
		itemID = answers.itemID;
		orderQty = answers.quantity;
		var item = res[itemID - 1];
		itemName = item.product_name;
		price = item.price;
		stockQty = item.stock_quantity;
   
		// getStock(); 
		placeOrder();
	});
};

// function getStock() {
// 	connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", itemID, function(err, res) {
// 		if (err) throw err;
// 		// console.log(res[0].stock_quantity);
// 		var stockQty = res[0].stock_quantity;
// 		// console.log(stockQty);
// 		var newQty = stockQty - orderQty
// 		// console.log(newQty);

// 		if (newQty < 0) {
// 			console.log("Order too much. canceled order")
// 			connection.end();
// 			return
// 		}
// 		else if (newQty > stockQty) {
// 			console.log("No returns!")
// 			connection.end();
// 			return
// 		}

// 		placeOrder(newQty)

// 	});
// };

function placeOrder(newQty) {

	var newQty = stockQty - orderQty;

	console.log("Order: " + orderQty);
	console.log("Stock: " + stockQty);
	console.log("New: " + newQty);

	if (newQty < 0) {
		console.log("Order too much. canceled order")
		connection.end();
		return
	}
	else if (newQty > stockQty) {
		console.log("No returns!")
		connection.end();
		return
	}

	//Get the quantity from the database stock and subtract the order quantity to get the new quantity
	connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[newQty, itemID] ,function(err, res) {
		console.log("This is working")
		if (err) throw err;

		var charge = orderQty * price;
		console.log("You ordered " + orderQty + " of item: " + itemName);
		console.log("Your total is: $" + charge);
		connection.end();
	});
};

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayStock();
});

// placeOrder(1, 0);
//Prompts the user for the item ID, then asks how many units they want	        