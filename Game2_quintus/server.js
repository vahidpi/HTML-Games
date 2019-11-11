var express = require("express");
var path=require("path");
var app=express();

app.use('/data', express.static(__dirname+'/data'));
app.use('/images', express.static(__dirname+'/images'));
app.use('/Scrips', express.static(__dirname+'/Scrips'));

app.get('/', function(req, resp) {
	resp.sendFile('index.html', { root: __dirname });	
});

app.listen(1234, function(){
	console.log('Listening ad Port 1234');
});