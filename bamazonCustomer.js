var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "RootPass",
	database: "bamazon"
});

var table = new Table({
    head: ['item #', 'product name', 'department', 'price', 'quantity']
  , colWidths: [8, 60, 16, 8, 10]
});

connection.query("SELECT * FROM products", function(err, res){
	if (err) throw err;

	for (var i = 0; i < res.length; i++) {
		table.push(Object.keys(res[i]).map(function(key) {return res[i][key];}));
	}
	// console.log(Object.keys(res[0]).map(function(key) {return res[0][key];}))
	
	console.log(table.toString());
	connection.end();
})