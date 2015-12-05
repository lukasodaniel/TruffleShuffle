var mainapp = require('./app');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});


var Request = function(requester, deliverer, orderStatus, restaurantID, orderDetails, deliveryAddress) {
	
			this.requester = requester;
			this.deliverer = deliverer;
			this.orderStatus = orderStatus;
			this.restaurantID = restaurantID;
			this.orderDetails = orderDetails;
			this.deliveryAddress = deliveryAddress;
	
}

module.exports.Request = Request;

Request.prototype.saveRequest = function()		//Add a row to the user email with current information 
//Combine save and update? Action on duplicate?
{
	connection.query("INSERT INTO TS_Requests VALUES(NULL, ?,?,?,?,?,?)", [this.requester, this.deliverer, this.orderStatus, this.restaurantID, this.orderDetails, this.deliveryAddress]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
		
		}
	);
}

function updateRequest()
{
	connection.query("UPDATE TS_Requests SET Requester=?, Deliverer=?, OrderStatus=?, RestaurantID=?, OrderDetails=?, DeliveryAddress=?",[this.requester, this.deliverer, this.orderStatus, this.restaurantID, this.orderDetails, this.deliveryAddress], 
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
	connection.query("SELECT * FROM TS_Requests WHERE Email=?", [requesterEmail]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then 
			mainapp.RequestsByRequesterReciever(rows, req, res);
		}
	);
}

var getAllOpenRequests = function(req, res)
{
	connection.query("SELECT * FROM TS_Requests WHERE OrderStatus=?", ["open"]
	, function(err, rows, fields) {
		if (err) 
			throw err;
		
			//call a function in app.js, which will then return the information
			mainapp.OpenRequestsReciever(rows, req, res);
		}
	);
}

module.exports.getAllOpenRequests = getAllOpenRequests;
module.exports.getRequestsByRequester = getRequestsByRequester;

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

