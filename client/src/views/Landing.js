import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const Landing = (props) => (
  <Jumbotron>
    <h1>Welcome to BlckBx!</h1>
    <p>Shareable algorithms on the go.</p>
    <Button bsStyle="primary" onClick={() => props.updateLogin(true)}>
      Login
    </Button>
  </Jumbotron>
);

export default Landing;
