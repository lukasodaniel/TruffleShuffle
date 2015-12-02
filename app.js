var express = require('express');
var stormpath = require('express-stormpath');
var ejs = require('ejs');
var html = require('html');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});
var User = require('./User');


var app = express();

//Staticly serve js and css files, also use the ejs template engine which allows the rendering of raw html, although the file extensions remains as .ejs
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//connecting to mysql database
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

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
	var newUser = new User(account.email, account.givenName,account.surname ,account.customData.Venmo, account.customData.phone);
	newUser.saveUser();
	
	next();
}
	
	,
  website: true
}));

app.get('/', function(req, res) {
	var shrivar = new User("shrivar@gmail.com");
  res.render('anastasia');
});


app.use('/profile',stormpath.loginRequired,require('./profile')()); 

app.use('/open_requests',stormpath.loginRequired,require('./open_requests')()); 

app.use('/submit_request',stormpath.loginRequired,require('./submit_request')()); 

app.on('stormpath.ready',function(){
  app.listen(3000);
});