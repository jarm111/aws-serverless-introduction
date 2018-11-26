const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const aws = require('aws-sdk');

const todosTable = process.env.TODOS_TABLE;
const dynamoDb = new aws.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Get Todo endpoint
app.get('/todos/:todoId', function(req, res) {
  const params = {
    TableName: todosTable,
    Key: {
      todoId: req.params.todoId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get todo' });
    }
    if (result.Item) {
      const { todoId, description } = result.Item;
      res.json({ todoId, description });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  });
});

// Create Todo endpoint
app.post('/todos', function(req, res) {
  const { todoId, description } = req.body;
  if (typeof todoId !== 'string') {
    res.status(400).json({ error: '"todoId" must be a string' });
  } else if (typeof description !== 'string') {
    res.status(400).json({ error: '"description" must be a string' });
  }

  const params = {
    TableName: todosTable,
    Item: {
      todoId: todoId,
      description: description
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create todo' });
    }
    res.json({ todoId, description });
  });
});

module.exports.handler = serverless(app);
