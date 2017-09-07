import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import ShareButtons from '../components/ShareButtons';

class Landing extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {

    return(
      <div>
        <Jumbotron className="mtl mbl">
          <h1 className="mbn">Welcome to <span className="light-sea">BlckBx!</span></h1>
          <h2 className="mts mbm">Your programs, <span className="deep-sea">anywhere.</span></h2>
          <h4>If you've ever wanted a quick and easy way to share a program with a colleague or friend without the hassle of building a GUI, then BlckBx is the tool for you.</h4>
          <h4>Now, the process of distributing text based programs is streamlined. Head on over to the <Link to="/instructions" className="deep-sea">Help</Link> section for more info and program ideas.</h4>
          <h4>To get started, signup below.</h4>
          <Button className="btn-primary mtm" onClick={() => this.props.updateLogin()}>
            Signup
          </Button>
        </Jumbotron>
        <ShareButtons url={window.location.href}/>
      </div>
    );
  }
}

export default Landing;
