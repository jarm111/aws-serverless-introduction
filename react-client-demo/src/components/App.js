import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Todos React Demo</h1>
            <p>Todos react demo client for Serverless Rest API demo</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
