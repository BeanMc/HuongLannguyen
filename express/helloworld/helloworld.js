var express =require('express');
var serveIndex = require('serve-index');
var path= require('path');

var app=express();
var port=3000;

app.get('/name/:username',function (req, res) {
    res.status(200);
    res.set("Content-type","text/html")

    res.send("<html><body>hello "+req.params['username']+"</body></html>")
    res.end('Hello Wolrd');
})
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.listen(port,function () {
    console.log(app.get('env'));
    console.log("this server is running ");
})


exports.index = function(req, res){
    res.render('index.ejs', { title: 'Express' });
};