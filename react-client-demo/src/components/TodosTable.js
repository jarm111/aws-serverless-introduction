import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';

const TodosTable = props => {
  const tableRows = props.todos.map((item, index) => (
    <tr key={item.todoId}>
      <th scope="row">{index + 1}</th>
      <td>{item.description}</td>
      <td>{item.isDone ? '\u2713' : '–'}</td>
      <td>
        <Button onClick={() => props.onToggleStatusClick(item, index)}>
          Toggle Status
        </Button>
      </td>
      <td>
        <Button onClick={() => props.onDeleteClick(item.todoId)}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Status</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
};

TodosTable.propTypes = {
  onDeleteClick: PropTypes.func,
  onToggleStatusClick: PropTypes.func,
  todos: PropTypes.array
};

export default TodosTable;
