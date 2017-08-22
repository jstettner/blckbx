import React, { Component } from 'react';
import IDE from '../components/IDE';
import Browser from '../components/Browser';

class DevInterface extends Component {
  constructor() {
    super();
    this.state = {
      code: "// only accepts one function in the following format, params can vary.\n\nfunction(x) {\n\treturn x;\n}",
      program_link: null,
      program_name: "untitled"
    }

    this.updateCode = this.updateCode.bind(this);
    this.save = this.save.bind(this);
    this.fetchProgram = this.fetchProgram.bind(this);
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
        this.props.reauth(localStorage.getItem('accountData'));
      } else {
        console.log('failed');
      }
     });
  }

  fetchProgram(link) {
    var payload = {
      link: link,
      token: localStorage.getItem('accountData')
    }

    fetch(('/getProgram'), {
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
          code: responseJson.program,
          program_link: link,
          program_name: responseJson.name
        });
      } else {
        console.log('failed to get');
      }
     });
  }

  render() {
    return(
      <div className="dev">
        <IDE code={this.state.code} updateCode={this.updateCode}/>
        <Browser save={this.save} updateCode={this.updateCode} programName={this.state.program_name} fetchProgram={this.fetchProgram} programs={this.props.programs} />
      </div>
    );
  }
}

export default DevInterface;
