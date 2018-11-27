import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TodosTable from './TodosTable';
import AddTodoForm from './AddTodoForm';
import { getTodos } from '../utils/apiCalls';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleToggleStatusClick = this.handleToggleStatusClick.bind(this);
  }

  componentDidMount() {
    getTodos()
      .then(res => res.json())
      .then(res => this.setState(() => ({ todos: res })));
  }

  handleSubmit(newEntry) {
    this.setState(state => ({
      todos: [...state.todos, newEntry]
    }));
  }

  handleDeleteClick(index) {
    this.setState(state => ({
      todos: state.todos.slice(0, index).concat(state.todos.slice(index + 1))
    }));
  }

  handleToggleStatusClick(item, index) {
    this.setState(state => {
      let newTodos = [...state.todos];
      newTodos[index].isDone = !item.isDone;
      return { todos: newTodos };
    });
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
            <h5>Add new todo:</h5>
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
