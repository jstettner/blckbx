import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import ReactGA from 'react-ga';

class Landing extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return(
      <Jumbotron className="mtl">
        <h1>Welcome to <span className="light-sea">BlckBx!</span></h1>
        <p>Shareable scripts for <span className="deep-sea">non-devs.</span></p>
        <Button className="btn-dark" onClick={() => this.props.updateLogin(true)}>
          Login
        </Button>
      </Jumbotron>
    );
  }
}

export default Landing;
