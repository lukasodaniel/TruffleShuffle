var express = require('express');
var stormpath = require('express-stormpath');
var ejs = require('ejs');
var html = require('html');
var mysql = require('mysql');
var http = require('http');
var user = require('./User');
var foodRequests = require('./Request');
var Restaurants = require('./Restaurant');
var bodyParser = require('body-parser')


var app = express();

//Staticly serve js and css files, also use the ejs template engine which allows the rendering of raw html, although the file extensions remains as .ejs
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '7B4ZQX1ET8PLAESYE59UDRKNX',
      secret: '1txJXWUQ5d2K7klbVn5h0IWGWB0FAnBznN2A78x8ZQw',
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/34CnU24wff6rygrsHbSYES'
  },
  expand: {
    customData: true
  },
  web:{
	  register: {
		fields: {
		  phone: {
			  enabled: true,
			  name: 'phone',
			  placeholder: 'Phone Number',
			  required: true,
			  type: 'text'
			},
		Venmo: {
			  enabled: true,
			  name: 'Venmo',
			  placeholder: 'Venmo Username',
			  required: false,
			  type: 'text'
				}	
			}
	}
  }
  ,
  
  postRegistrationHandler: function (account, req, res, next) {
	//Put user data into our own mySQL database for ease of queries relating to requests objects
	var newUser = new user.User(account.email, account.givenName,account.surname ,account.customData.Venmo, account.customData.phone);
	newUser.saveUser();
	
	next();
}
	
	,
  website: true
}));

app.get('/', function(req, res) {
  var shrivar = new user.User("shrivar@gmail.com");
  //console.log(req.user)
  //console.log()
  res.render('anastasia');
});

app.get('/getAllRequests', function(req, res) {
  foodRequests.getAllOpenRequests();
});


app.use('/profile',stormpath.loginRequired,require('./profile')()); 

app.use('/open_requests',stormpath.loginRequired,require('./open_requests')()); 

app.use('/submit_request',stormpath.loginRequired,require('./submit_request')()); 

app.on('stormpath.ready',function(){
  app.listen(3000);
});

app.get('/getAllOpenRequests', function(req,res)
{
  //console.log(foodRequests)
    foodRequests.getAllOpenRequests(req,res) 
});

app.get('/getReqestsByRequester', function (req,res)
{
    //getRequestsByRequester(req.user.username, req, res); //gets current user from stormpath session
});

app.get('getRestaurants', function (req,res)
{
  Restaurants.getAllRestaurants(req,res);
})

//expose this function via exports
var OpenRequestsReciever = function (openRequests, req, res)
{
    res.send(openRequests);
}


var RequestsByRequesterReciever = function (userRequest, req, res)
{
    res.send(userRequest);
}

var RestaurantsReciver = function (Restaurants, req, res)
{
  res.send(Restaurants);
}

module.exports.RequestsByRequesterReciever  = RequestsByRequesterReciever
module.exports.OpenRequestsReciever = OpenRequestsReciever;
module.exports.RestaurantsReciver = RestaurantsReciver;