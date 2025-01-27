//create web server
var express = require('express');
var app = express();
//parse request body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//create database
var Datastore = require('nedb');
var db = new Datastore({ filename: 'comments.db', autoload: true });
//serve static files
app.use(express.static('public'));

//get all comments
app.get('/comments', function (req, res) {
    db.find({}, function (err, docs) {
        res.json(docs);
    });
});

//add a comment
app.post('/comments', function (req, res) {
    var newComment = req.body;
    db.insert(newComment, function (err, doc) {
        res.json(doc);
    });
});

//start server
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});