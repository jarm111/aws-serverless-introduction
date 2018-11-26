const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const uuid = require('uuid/v1');

const todosTable = process.env.TODOS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new aws.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new aws.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

app.get('/', function(req, res) {
  res.send('Hello, this is Serverless REST-API demo!');
});

app.get('/todos', function(req, res) {
  const params = {
    TableName: todosTable
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get todo' });
    }
    if (result.Items) {
      const todos = result.Items.map(({ todoId, description, isDone }) => ({
        todoId,
        description,
        isDone
      }));
      res.json(todos);
    } else {
      res.status(404).json({ error: 'Todos not found' });
    }
  });
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
      const { todoId, description, isDone } = result.Item;
      res.json({ todoId, description, isDone });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  });
});

// Create Todo endpoint
app.post('/todos', function(req, res) {
  const { description } = req.body;
  if (typeof description !== 'string') {
    res.status(400).json({ error: '"description" must be a string' });
  }

  const todoId = uuid();
  const isDone = false;

  const params = {
    TableName: todosTable,
    Item: {
      todoId,
      description,
      isDone
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create todo' });
    }
    res.json({ todoId, description, isDone });
  });
});

app.put('/todos/:todoId', function(req, res) {
  const { isDone } = req.body;
  if (typeof isDone !== 'boolean') {
    res.status(400).json({ error: '"isDone" must be a boolean' });
  }

  const params = {
    TableName: todosTable,
    Key: {
      todoId: req.params.todoId
    },
    ConditionExpression: 'attribute_exists(todoId)',
    UpdateExpression: 'set isDone = :isD',
    ExpressionAttributeValues: {
      ':isD': isDone
    },
    ReturnValues: 'UPDATED_NEW'
  };

  dynamoDb.update(params, (error, data) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .send(
          'Unable to update item. Error JSON:' + JSON.stringify(error, null, 2)
        );
    } else {
      res
        .status(200)
        .send('UpdateItem succeeded:' + JSON.stringify(data, null, 2));
    }
  });
});

app.delete('/todos/:todoId', function(req, res) {
  const params = {
    TableName: todosTable,
    Key: {
      todoId: req.params.todoId
    },
    ConditionExpression: 'attribute_exists(todoId)'
  };

  dynamoDb.delete(params, (error, data) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .send(
          'Unable to delete item. Error JSON:' + JSON.stringify(error, null, 2)
        );
    } else {
      res
        .status(200)
        .send('DeleteItem succeeded:' + JSON.stringify(data, null, 2));
    }
  });
});

module.exports.handler = serverless(app);
