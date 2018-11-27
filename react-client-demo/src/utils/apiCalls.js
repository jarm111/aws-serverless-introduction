const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTodos = () => {
  const init = {
    method: 'GET'
  };

  return fetch(baseUrl + '/todos', init);
};
