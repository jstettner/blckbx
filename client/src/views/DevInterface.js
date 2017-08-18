import React, { Component } from 'react';
import IDE from '../components/IDE';
import Browser from '../components/Browser';

class DevInterface extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      current_program: 'new'
    }
  }

  updateCode(event) {
    this.setState({
      code: event
    });
  }

  save(name) {
    var payload = {
      name: name,
      program: this.state.code,
      token: localStorage.getItem('accountData')
    }

    fetch('/saveprogram', {
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
        console.log('program saved');
      } else {
        console.log('failed');
      }
     });
  }

  render() {
    return(
      <div className="dev">
        <IDE code={this.state.code} updateCode={this.updateCode.bind(this)}/>
        <Browser save={this.save.bind(this)} programs={this.props.programs} />
      </div>
    );
  }
}

export default DevInterface;
