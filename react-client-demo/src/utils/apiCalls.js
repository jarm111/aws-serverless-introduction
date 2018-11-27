const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchTodos = () => {
  const init = {
    method: 'GET'
  };

  return fetch(baseUrl + '/todos', init);
};

export const postNewTodo = description => {
  const init = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ description })
  };

  return fetch(baseUrl + '/todos', init);
};

export const deleteTodo = todoId => {
  const init = {
    method: 'DELETE'
  };

  return fetch(baseUrl + '/todos/' + todoId, init);
};

export const updateTodo = (todoId, isDone) => {
  const init = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ isDone })
  };
  return fetch(baseUrl + '/todos/' + todoId, init);
};
