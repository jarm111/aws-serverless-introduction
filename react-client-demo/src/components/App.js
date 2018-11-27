import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TodosTable from './TodosTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: mockTodos };
  }

  render() {
    return (
      <Container>
        <Row className="mt-5 mb-5">
          <Col>
            <h1>Todos React Demo</h1>
            <p>Todos react demo client for Serverless Rest API demo</p>
          </Col>
        </Row>
        <TodosTable todos={this.state.todos} />
      </Container>
    );
  }
}

const mockTodos = [
  {
    todoId: '7c40de40-f233-11e8-a954-7f9cf6134fc7',
    description: 'Mow the lawn',
    isDone: false
  },
  {
    todoId: '82bdf0a0-f233-11e8-a954-7f9cf6134fc7',
    description: 'Wash the dishes',
    isDone: false
  },
  {
    todoId: '7b849320-f233-11e8-a954-7f9cf6134fc7',
    description: 'Paint the walls',
    isDone: true
  },
  {
    todoId: '7ce1d930-f233-11e8-a954-7f9cf6134fc7',
    description: 'Buy groceries',
    isDone: true
  }
];

export default App;
