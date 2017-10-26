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
		console.log("This is working");
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
		}
		console.log(table.toString());
		promptManager();
	});
};

function testFunction() {
	console.log("test");
}

var promptManager = function() {
		inquirer.prompt([
	{
		type: "rawlist",
		name: "choice",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Los Inventory",
			"Add to Inventory",
			"Add New Product"
		]
	}	
		]).then(function (answer) {
		console.log(JSON.stringify(answer));
		console.log(answer.choice);
		switch (answer.choice) {

			case "View Products for Sale":
				// console.log("ok")
				displayStock();
				// testFunction();
				break;

			case "View Los Inventory":
				console.log("ok");
				break;

			case "Add to Inventory":
				console.log("ok");
				break;

			case "Add New Product":
				console.log("ok");
				break;
		}
	});
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayStock();
  // promptManager();
});