//create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = [];
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/comments', function(req, res) {
    res.json(comments);
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    res.json(comment);
});

app.listen(port, function() {
    console.log('Server started on http://localhost:' + port);
});