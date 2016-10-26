var express =require('express');
var serveIndex = require('serve-index');
var path= require('path');

var app=express();
var port=3000;
app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id == 0) next('route');
    // otherwise pass the control to the next middleware function in this stack
    else next(); //
}, function (req, res, next) {
    // render a regular page
    res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
    res.render('special');
});

app.listen(port,function () {
    console.log(app.get('env'));
    console.log("this server is running ");
})