import React from 'react';
import Console from 'react-console-component';
import createClass from 'create-react-class';
import ClipboardButton from 'react-clipboard.js';
import Header from '../components/Header';
import ReactGA from 'react-ga';
import ShareButtons from '../components/ShareButtons';

let Programview = createClass({
  getInitialState: function() {
    return {
      name: "",
      prompt: "",
      link: this.props.match.params.link,
      copied: false,
      found: true
    };
  },
  componentDidMount: function() {
    ReactGA.pageview(window.location.pathname);
    var payload = {
      link: this.state.link
    }

    fetch(('/api/initializeprogram'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        this.setState({
          name: responseJson.name,
          prompt: responseJson.prompt
        });
      } else {
        this.setState({
          found: false
        });
        console.log('failed to get');
      }
     });
  },
  run: function(params) {
    var payload = {
      link: this.state.link,
      params: params
    }

    fetch(('/api/runprogram'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success) {
        if(responseJson.console.length > 0) {
          if(Array.isArray(responseJson.console)) {
            responseJson.console.forEach(function(element) {
              this.refs.console.log(element);
            }, this);
          } else {
            this.refs.console.log(responseJson.console);
          }
        }
        if(responseJson.result !== 'null') this.refs.console.logX('result', responseJson.result);
        this.refs.console.return();
      } else {
        console.log('failed to get');
      }
     });
  },
  copy: function() {
    this.setState({
      copied: true
    });
    setTimeout(() => this.setState({copied:false}), 2000);
  },
  render: function() {
      return (
        <div className="programview">
          <Header toApp={true}/>
          {this.state.found ? (
          <div className="container">
            <h2 className="deeper-sea">{this.state.name}</h2>
            <Console ref="console"
              welcomeMessage={this.state.prompt}
              handler={this.run}
              autofocus={true}
            />
            <h3 className="text-color">Share this:</h3>
            <ShareButtons className="mtm" url={window.location.href}/>
            <span className="text-color"> or copy the link: </span>
            <ClipboardButton className="light-sea outline-none" data-clipboard-text={window.location.href} onClick={() => this.copy()}>
              {(this.state.copied ? 'copied!' : 'copy to clipboard')}
            </ClipboardButton>
          </div>
        ) : (
          <div className="container">
            <h2 className="deeper-sea">Program Not Found</h2>
            <h3 className="deep-sea">You may have the wrong link, or this program could have been deleted.</h3>
          </div>
        )}
      </div>
    );
  }
});

export default Programview;
