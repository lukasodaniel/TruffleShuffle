var express = require('express');
var stormpath = require('express-stormpath');
var ejs = require('ejs');
var html = require('html');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'classroom.cs.unc.edu',
  user     : 'shrivar',
  password : 'secret',
  database : 'shrivardb'
});


var app = express();

//Staticly serve js and css files, also use the ejs template engine which allows the rendering of raw html, although the file extensions remains as .ejs
//app.use(express.static(__dirname + '/views'));
//app.set('views', __dirname + '/views');
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
  
  postRegistrationHandler: function (account, req, res, next) {
    console.log('User:', account.email, 'just registered!');
	
	//Put user data into our own mySQL database for ease of queries relating to requests objects
    next();
  },
  website: true
}));

app.get('/', function(req, res) {
  res.render('home');
});

app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
  app.listen(3000);
});