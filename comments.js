// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// create a comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  const comments = getComments();
  comments.push(newComment);
  saveComments(comments);
  res.send('Comment added');
});

// get all comments
app.get('/comments', (req, res) => {
  const comments = getComments();
  res.json(comments);
});

// get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comments = getComments();
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// update a comment by id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  const comments = getComments();
  const index = comments.findIndex(comment => comment.id === id);
  comments[index] = updatedComment;
  saveComments(comments);
  res.send('Comment updated');
});

// delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comments = getComments();
  const index = comments.findIndex(comment => comment.id === id);
  comments.splice(index, 1);
  saveComments(comments);
  res.send('Comment deleted');
});

// helper functions
const getComments = () => {
  const comments = fs.readFileSync('comments.json');
  return JSON.parse(comments);
};

const saveComments = (comments) => {
  fs.writeFileSync('comments.json', JSON.stringify(comments));
};

// start server
app.listen(3000, () => {
  console.log('Server started');
});