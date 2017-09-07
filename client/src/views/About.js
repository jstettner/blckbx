import React, { Component } from 'react';
import Header from '../components/Header';
import ReactGA from 'react-ga';

class About extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return(
      <div className="about">
        <Header toApp={true}/>
        <div className="container">
          <h1 className="light-sea">About</h1>
          <hr/>
          <h2 className="deeper-sea">Developer</h2>
          <h4 className="text-color">
            This site was developed by <a className="light-sea" href='https://github.com/jstettner'>Jack Stettner</a>.
            <br/>
            <br/>
            If you would like to support the program, Bitcoin donations are always appreciated: <span className="light-sea">1ALPrNsBPkbTUQocF1sJbKoBq3NKFLjZts</span>.
            <br/>
            They help pay for server costs, and allow BlckBx to remain ad-free and free of charge.
          </h4>
          <h2 className="deeper-sea">Security</h2>
          <h4 className="text-color">
            This site stores hashed passwords, so even the site admins don't have access to user information.
            <br/>
            <br/>
            In addition, when a program link is shared, the program is not served to the client. Instead, the program is executed with user parameters in a sandbox on the server.
            This means any private data in the program isn't distributed to program users.
            <br/>
            <br/>
            Despite these security measures, this site still shouldn't be used for sensitive information.
            <br/>
            <br/>
            In the event of a compromise, we are <span className="light-sea">NOT RESPONSIBLE</span> for any user data exposed.
          </h4>
          <h2 className="deeper-sea">Work in progress</h2>
          <h4 className="text-color pbl">
            This site is a work in progress, if you have any suggestions, or discover any bugs, please email <a href="mailto:blckbx.suggestions@gmail.com" className="light-sea">blckbx.suggestions@gmail.com</a>.
          </h4>
        </div>
      </div>
    );
  }
}

export default About;
