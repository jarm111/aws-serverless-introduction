const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(bodyParser.json({ strict: false }));
app.use(cors());

app.get('/', function(req, res) {
  return res.send('Hello, this is Serverless REST-API demo!');
});

todoRoutes(app);

module.exports.handler = serverless(app);
