import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TodosTable from './TodosTable';
import AddTodoForm from './AddTodoForm';
import {
  fetchTodos,
  postNewTodo,
  deleteTodo,
  updateTodo
} from '../utils/apiCalls';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleToggleStatusClick = this.handleToggleStatusClick.bind(this);
  }

  componentDidMount() {
    this.setTodosState();
  }

  setTodosState() {
    fetchTodos()
      .then(res => res.json())
      .then(res => this.setState(() => ({ todos: res })));
  }

  handleSubmit(description) {
    postNewTodo(description).then(() => this.setTodosState());
  }

  handleDeleteClick(item) {
    deleteTodo(item.todoId).then(() => this.setTodosState());
  }

  handleToggleStatusClick(item) {
    updateTodo(item.todoId, !item.isDone).then(() => this.setTodosState());
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
        <Row className="mb-5">
          <Col>
            <h5>Add new Todo:</h5>
            <AddTodoForm onSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <TodosTable
          todos={this.state.todos}
          onToggleStatusClick={this.handleToggleStatusClick}
          onDeleteClick={this.handleDeleteClick}
        />
      </Container>
    );
  }
}

export default App;
