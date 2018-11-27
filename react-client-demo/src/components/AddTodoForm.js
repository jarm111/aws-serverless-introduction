import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      itemId: '1001'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="description" className="mr-sm-2">
            Description
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="todoId" className="mr-sm-2">
            Id
          </Label>
          <Input
            type="text"
            name="todoId"
            id="todoId"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <Button onClick={() => this.props.onSubmit(this.state)}>Submit</Button>
      </Form>
    );
  }
}

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddTodoForm;
