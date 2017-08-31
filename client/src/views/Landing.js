import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class Landing extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return(
      <Jumbotron className="mtl">
        <h1 className="mbn">Welcome to <span className="light-sea">BlckBx!</span></h1>
        <h2 className="mts mbm">Your scripts, <span className="deep-sea">anywhere.</span></h2>
        <h4>If you've ever wanted a quick and easy way to share a script with a colleague or friend without the hassle of building a UI, then BlckBx is the tool for you.</h4>
        <h4>Now its easy to distribute simple utility algorithms and much more. Head over to the <Link to="/instructions" className="deep-sea">Help</Link> section for more info and program ideas.</h4>
        <h4>To get started, signup below.</h4>
        <Button className="btn-primary mtm" onClick={() => this.props.updateLogin()}>
          Signup
        </Button>
      </Jumbotron>
    );
  }
}

export default Landing;
