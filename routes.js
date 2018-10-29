const express = require('express');
const app = express();
const fs = require('fs');
app.set('view engine','ejs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// to run the app online with heroku us should set aport dinamic 
const port = process.env.PORT || 3000 ;

//handle static calls to assets
app.use('/assets',express.static('assets'));
app.use(function (req,res,next) {
	// body...

	var data = new Date().toString();
	var log = `${data}  :: ${req.method}  ::  ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log +'\n',function (err) {
		return err ;
	})
	next();
})
app.get('/',function (req,res) {
  res.render('index');
});
app.get('/contact',function (req,res) {
  res.render('contact');
});
app.get('/about',function (req,res) {
  res.render('about');
});
app.post('/contact',urlencodedParser,function (req,res) {
	console.log(req.body);
  res.render('contactsucc',{data:req.body});
});
app.listen(port);
console.log(`your on 127.0.0.1:${port}`);
