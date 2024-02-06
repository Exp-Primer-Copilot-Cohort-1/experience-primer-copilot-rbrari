// Create web server
// Use express to create web server
const express = require('express');
const app = express();
// Use body-parser to parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Use mongodb to store data
const MongoClient = require('mongodb').MongoClient;
// Use cors to allow cross-origin requests
const cors = require('cors');
app.use(cors());

// Connect to the database
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  db = client.db('myblog');
});

// Get comments
app.get('/api/comments', (req, res) => {
  db.collection('comments').find().toArray((err, comments) => {
    res.json(comments);
  });
});

// Add comments
app.post('/api/comments', (req, res) => {
  const newComment = {
    id: Date.now(),