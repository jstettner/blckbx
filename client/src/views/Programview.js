import React from 'react';
import Console from 'react-console-component';
import createClass from 'create-react-class';
import Header from '../components/Header';

let Programview = createClass({
  getInitialState: function() {
    return {
      name: "",
      prompt: "",
      link: this.props.match.params.link
    };
  },
  componentDidMount: function() {
    var payload = {
      link: this.state.link
    }

    fetch(('/initializeprogram'), {
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
        console.log('failed to get');
      }
     });
  },
  run: function(params) {
    var payload = {
      link: this.state.link,
      params: params
    }

    fetch(('/runprogram'), {
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
        console.log(responseJson);
        this.refs.console.log(responseJson.console);
        this.refs.console.logX('result', responseJson.result);
        this.refs.console.return();
      } else {
        console.log('failed to get');
      }
     });
  },
  render: function() {
      return (
        <div className="container">
          <Header />
          <h2>> {this.state.name}</h2>
          <Console ref="console"
            welcomeMessage={this.state.prompt}
            handler={this.run}
            autofocus={true}
          />
        </div>
    );
  }
});

export default Programview;
