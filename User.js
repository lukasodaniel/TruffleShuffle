var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});

//Private
var privateVariable = true;

//Public
module.exports = User;
function User(email,firstName, lastName, venmo, phone) {
	
	
	switch(arguments.length)
	{
		case 1:		//If only the email is given as an argument, we lookup a user currently in the database 
					//with the specified email
			connection.query("SELECT * FROM TS_Users WHERE Email='" + email + "'"
			, function(err, rows, fields) {
				if (err) 
				{
					throw err;
				}
					
				else
					this.email = rows[0].Email;
					this.firstName = rows[0]["First Name"];
					this.lastName = rows[0]["Last Name"];
					this.phoneNumber = rows[0]["Phone Number"];
					this.venmo = rows[0]["Venmo Username"];
				}
				
			);
			break;
			
		case 5: 	//If all 5 arguments are given, create a new user
				this.firstName = firstName;
				this.lastName = lastName;
				this.email = email;
				this.phoneNumber = phoneNumber;
				this.venmo = venmo;
			break;
	}
	
}

User.prototype.saveUser = function()		//Add a row to the user email with current information 
{
	connection.query("INSERT IGNORE INTO TS_Users VALUES('" + connection.escape(this.email) + "', '" + connection.escape(this.firstName) + "', '" + connection.escape(this.lastName) + "', '" + connection.escape(this.venmo) + "','" + connection.escape(this.phone) + "')"
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
		
		}
	);
}

function updateUser()
{
	connection.query("UPDATE TS_Users SET FirstName=?, LastName=?, VenmoUserName=?, PhoneNumber=?",[this.firstName, this.lastName, this.venmo, this.phoneNumber], 
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