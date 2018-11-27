const uuid = require('uuid/v1');
const todosTable = process.env.TODOS_TABLE;

module.exports = (app, db) => {
  app.get('/', function(req, res) {
    return res.send('Hello, this is Serverless REST-API demo!');
  });

  app.get('/todos', function(req, res) {
    const params = {
      TableName: todosTable
    };

    db.scan(params, (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(
            'Unable to get items. Error JSON:' + JSON.stringify(error, null, 2)
          );
      }

      if (!result.Items) {
        return res.status(404).json({ error: 'Todos not found' });
      }

      const todos = result.Items.map(({ todoId, description, isDone }) => ({
        todoId,
        description,
        isDone
      }));

      return res.status(200).json(todos);
    });
  });

  app.get('/todos/:todoId', function(req, res) {
    const params = {
      TableName: todosTable,
      Key: {
        todoId: req.params.todoId
      }
    };

    db.get(params, (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(
            'Unable to get item. Error JSON:' + JSON.stringify(error, null, 2)
          );
      }

      if (!result.Item) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const { todoId, description, isDone } = result.Item;
      return res.json({ todoId, description, isDone });
    });
  });

  app.post('/todos', function(req, res) {
    const { description } = req.body;
    if (typeof description !== 'string') {
      return res.status(400).json({ error: '"description" must be a string' });
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

    db.put(params, error => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(
            'Unable to create todo. Error JSON:' +
              JSON.stringify(error, null, 2)
          );
      }

      return res.status(200).json({ todoId, description, isDone });
    });
  });

  app.put('/todos/:todoId', function(req, res) {
    const { isDone } = req.body;
    if (typeof isDone !== 'boolean') {
      return res.status(400).json({ error: '"isDone" must be a boolean' });
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

    db.update(params, (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(
            'Unable to update item. Error JSON:' +
              JSON.stringify(error, null, 2)
          );
      }

      return res
        .status(200)
        .send('UpdateItem succeeded:' + JSON.stringify(data, null, 2));
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

    db.delete(params, (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .send(
            'Unable to delete item. Error JSON:' +
              JSON.stringify(error, null, 2)
          );
      }

      return res
        .status(200)
        .send('DeleteItem succeeded:' + JSON.stringify(data, null, 2));
    });
  });
};
