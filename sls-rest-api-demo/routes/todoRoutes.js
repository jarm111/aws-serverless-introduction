const todoC = require('../controllers/todoController');

module.exports = app => {
  app
    .route('/todos')
    .get(todoC.getAllTodos)
    .post(todoC.createTodo);

  app
    .route('/todos/:todoId')
    .get(todoC.getTodo)
    .put(todoC.updateTodo)
    .delete(todoC.deleteTodo);
};
