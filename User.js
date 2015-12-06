var mainapp = require('./app.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});

//Public
var User = function (email,firstName, lastName, venmo, phone) {
	

	switch(arguments.length)
	{
		case 1:		//
			connection.query("SELECT * FROM TS_Users WHERE Email='" + email + "'"
			, function(err, rows, fields) {	
				if (err) 
				{
					throw err;
				}

				else
				{
					this.email = rows[0].Email;
					this.firstName = rows[0]["First Name"];
					this.lastName = rows[0]["Last Name"];
					this.phoneNumber = rows[0]["Phone Number"];
					this.venmo = rows[0]["Venmo Username"];
				}
				
			});
			break;
			
		case 5: 	//If all 5 arguments are given, create a new user
				this.firstName = firstName;
				this.lastName = lastName;
				this.email = email;
				this.phoneNumber = phone;
				this.venmo = venmo;
			break;
	}
	
}

module.exports.User = User;

User.prototype.saveUser = function()		//Add a row to the user email with current information 
//COMBINE SAVE AND UPDATE FUNCTIONS
{
	connection.query("INSERT IGNORE INTO TS_Users VALUES(?,?,?,?,?)", [this.email, this.firstName, this.lastName, this.venmo, this.phoneNumber]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
		
		}
	);
}


function updateUser()
{
	connection.query("UPDATE TS_Users SET FirstName=?, LastName=?, VenmoUserName=?, PhoneNumber=? WHERE Email=?",[this.firstName, this.lastName, this.venmo, this.phoneNumber, this.email], 
	function(err, rows, fields) {
		if (err) 
		{
			throw err;
		}
		
	}
	);
}


//No getter or setter for email, and email is being used as a primary key for each user, so we don't want to change that.

User.prototype.setFirstName = function (firstName)
{
	this.firstName = firstName;
	updateUser();
}

User.prototype.setLastName = function (lastName)
{
	this.lastName = lastName;
	updateUser();
}

User.prototype.setPhoneNumber = function (phoneNumber)
{
	this.phoneNumber = phoneNumber;
	updateUser();
}

User.prototype.setVenmo = function (Venmo)
{
	this.venmo = Venmo;
	updateUser();
}


User.prototype.getFirstName = function()
{
	return this.firstName;
}

User.prototype.getLastName = function()
{
	return this.lastName;
}

User.prototype.getPhoneNumber = function()
{
	return this.phoneNumber;
}

User.prototype.getVenmo = function()
{
	return this.venmo;
}