var express = require('express');
var nunjucks = require('nunjucks')
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

nunjucks.configure('public', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "home.html" );
})

app.get('/name', function (req, res) {
   res.sendFile( __dirname + "/" + "name.html" );
})


app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   
   var name= req.body.first_name + " " + req.body.last_name;
   res.render('hello.html', { name : name });
})

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

var server = app.listen(port, function () {

   console.log("Example app listening at http://%s:%s", host, port)

})