var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});

//Public
var Restaurant = function (name, address) {
	

	switch(arguments.length)
	{
			
		case 2: 	//If all 5 arguments are given, create a new user
				this.name = name;
				this.address = address;
			break;
	}
	
}

module.exports.Restaurant = Restaurant;

Restaurant.prototype.save = function()		//Add a row to the user email with current information 
//COMBINE SAVE AND UPDATE FUNCTIONS
{
	connection.query("INSERT IGNORE INTO TS_Restaurants VALUES(NULL,?,?)", [this.name, this.id]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
		
		}
	);
}


// function update()
// {
// 	connection.query("UPDATE TS_Restaurants SET FirstName=?, LastName=?, VenmoUserName=?, PhoneNumber=? WHERE Email=?",[this.firstName, this.lastName, this.venmo, this.phoneNumber, this.email], 
// 	function(err, rows, fields) {
// 		if (err) 
// 		{
// 			throw err;
// 		}
		
// 	}
// 	);
// }


//No getter or setter for email, and email is being used as a primary key for each user, so we don't want to change that.

Restaurant.prototype.setName = function (name)
{
	this.name = name;
	//update();
}

Restaurant.prototype.setAddress = function (address)
{
	this.address = address;
	//update();
}


Restaurant.prototype.getName = function()
{
	return this.name;
}

Restaurant.prototype.getAddress = function()
{
	return this.address;
}
