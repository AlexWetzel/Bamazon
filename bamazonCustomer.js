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

function displayStock() {
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
		}
		console.log(table.toString());
		connection.end();
		promptCustomer();
	});
};

function promptCustomer() {
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

		console.log("This works")
		console.log(answers.itemID)
		console.log(answers.quantity)
    
	});
}

displayStock();
//Prompts the user for the item ID, then asks how many units they want	        