import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
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
            value={this.state.value}
          />
        </FormGroup>
        <Button onClick={() => this.props.onSubmit(this.state.value)}>
          Submit
        </Button>
      </Form>
    );
  }
}

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddTodoForm;
