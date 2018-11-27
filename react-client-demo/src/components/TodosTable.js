import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const TodosTable = props => {
  const tableRows = props.todos.map((item, index) => (
    <tr key={item.todoId}>
      <th scope="row">{index + 1}</th>
      <td>{item.description}</td>
      <td>{item.isDone ? '\u2713' : '–'}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
};

TodosTable.propTypes = {
  todos: PropTypes.array
};

export default TodosTable;
