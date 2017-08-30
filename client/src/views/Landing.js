import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const Landing = (props) => (
  <Jumbotron className="mtl">
    <h1>Welcome to <span className="light-sea">BlckBx!</span></h1>
    <p>Shareable scripts for <span className="deep-sea">non-devs.</span></p>
    <Button className="btn-dark" onClick={() => props.updateLogin(true)}>
      Login
    </Button>
  </Jumbotron>
);

export default Landing;
