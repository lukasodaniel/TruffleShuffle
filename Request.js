var mainapp = require('./app.js');
var user = require('./User');
var Restaurant = require('./Restaurant')

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});


var Request = function(requester, deliverer, orderStatus, restaurantID, orderDetails, deliveryAddress, paymentMethod) {
	
			switch(arguments.length)
			{
			case 1:		//If only 1 parameter is given, we ASSUME THAT IT IS AN ID, and return the request matching the given ID
			connection.query("SELECT * FROM TS_Requests WHERE id='" + requester + "'"
			, function(err, rows, fields) {	
				if (err) 
				{
					throw err;
				}

				else
				{
					this.RequestID = rows[0].id;
					this.requester = rows[0].Requester;
					this.deliverer = rows[0].Deliverer;
					this.orderStatus = rows[0].OrderStatus;
					this.restaurantID = rows[0].RestaurantID;
					this.orderDetails = rows[0].OrderDetails;
					this.deliveryAddress = rows[0].DeliveryAddress;
					this.paymentMethod = rows[0].DeliveryAddress;
				}
				
			});
			break;
			
		case 7: 	//If all 5 arguments are given, create a new user
				this.requester = requester;
				this.deliverer = deliverer;
				this.orderStatus = orderStatus;
				this.restaurantID = restaurantID;
				this.orderDetails = orderDetails;
				this.deliveryAddress = deliveryAddress;
				this.paymentMethod = paymentMethod;
				break;
			}


	
}

module.exports.Request = Request;

Request.prototype.saveRequest = function()		//Add a row to the user email with current information 
//Combine save and update? Action on duplicate?
{
	connection.query("INSERT INTO TS_Requests VALUES(NULL, ?,?,?,?,?,?,?)", [this.requester, this.deliverer, this.orderStatus, this.restaurantID, this.orderDetails, this.deliveryAddress, this.paymentMethod]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
		
		}
	);
}

function updateRequest()
{
	connection.query("UPDATE TS_Requests SET Requester=?, Deliverer=?, OrderStatus=?, RestaurantID=?, OrderDetails=?, DeliveryAddress=?, PaymentMethod=?",[this.requester, this.deliverer, this.orderStatus, this.restaurantID, this.orderDetails, this.deliveryAddress, this.paymentMethod], 
	function(err, rows, fields) {
		if (err) 
		{
			throw err;
		}
		
	}
	);
}

//Following functions probably need to go in another js file, these are supposed to be 'static' methods

 var getRequestsByRequester = function(requesterEmail,req, res)
{
	connection.query("SELECT * FROM TS_Requests WHERE (Requester=? ) AND (NOT OrderStatus=?)", [requesterEmail,"closed"]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then 
			mainapp.RequestsByRequesterReciever(rows, req, res);
		}
	);
}

 var getRequestsByDeliverer = function(requesterEmail,req, res)
{
	connection.query("SELECT * FROM TS_Requests WHERE (Deliverer=? ) AND (NOT OrderStatus=?)", [requesterEmail,"closed"]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then 
			mainapp.RequestsByRequesterReciever(rows, req, res);
		}
	);
}


var getAllOpenRequests = function(currentUser,req, res)
{

	connection.query("SELECT * FROM TS_Requests WHERE OrderStatus=? AND (NOT Requester = ?)", ["open", currentUser]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then return the information
			mainapp.OpenRequestsReciever(rows, req, res);
		}
	);
}

var pickupOrder = function (currentUser, id)
{
	connection.query("UPDATE TS_Requests SET OrderStatus=?, Deliverer=? WHERE id=?",["active", currentUser,id], 
	function(err, rows, fields) {
		if (err) 
		{
			throw err;
		}
		
	}
	);
}

module.exports.getAllOpenRequests = getAllOpenRequests;
module.exports.getRequestsByRequester = getRequestsByRequester;
module.exports.getRequestsByDeliverer = getRequestsByDeliverer;
module.exports.pickupOrder = pickupOrder;

Request.prototype.getRequesterInfo = function()
{
	connection.query("SELECT * FROM TS_Users WHERE Email=?", [this.requester]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then 
			//mainapp.RequestsByRequesterReciever(rows, req, res);
		}
	);
}



Request.prototype.getRequester = function()
{
	return this.requester;
}

Request.prototype.getDeliverer = function()
{
	return this.deliverer;
}
Request.prototype.getOrderStatus = function()
{
	return this.orderStatus;
}
Request.prototype.getRestaurantID = function()
{
	return this.restaurantID;
}
Request.prototype.getOrderDetails = function()
{
	return orderDetails;
}
Request.prototype.getDeliveryAddress = function()
{
	return this.deliveryAddress;
}

Request.prototype.getPaymentMethod = function()
{
	return this.paymentMethod;
}

Request.prototype.setRequester = function(requester)
{
	this.requester = requester;
	updateRequest();
}

Request.prototype.setDeliverer = function(deliverer)
{
	this.deliverer = deliverer;
	updateRequest();
}
Request.prototype.setOrderStatus = function(orderStatus)
{
	this.orderStatus = orderStatus;
	updateRequest();
}
Request.prototype.setRestaurantID = function(restaurantID)
{
	this.restaurantID = restaurantID;
	updateRequest();
}
Request.prototype.setOrderDetails = function(orderDetails)
{
	this.orderDetails = orderDetails;
	updateRequest();
}
Request.prototype.setDeliveryAddress = function(deliveryAddress)
{
	this.deliveryAddress = deliveryAddress;
	updateRequest();
}

Request.prototype.setPaymentMethod = function(paymentMethod)
{
	this.paymentMethod = paymentMethod;
	updateRequest();
}
