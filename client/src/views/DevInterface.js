import React, { Component } from 'react';
import IDE from '../components/IDE';
import Browser from '../components/Browser';

class DevInterface extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      program_link: null,
      program_name: "",
      program_prompt: ""
    }

    this.updateCode = this.updateCode.bind(this);
    this.save = this.save.bind(this);
    this.fetchProgram = this.fetchProgram.bind(this);
    this.newProgram = this.newProgram.bind(this);
  }

  newProgram() {
    this.setState({
      code: "// only accepts one function in the following format, params can vary.\n\nfunction main(x) {\n\treturn x;\n}\n",
      program_link: null,
      program_name: "untitled",
      program_prompt: "enter something..."
    });
  }

  updateCode(event) {
    this.setState({
      code: event
    });
  }

  componentDidMount() {
    this.newProgram();
  }

  save(name,prompt,callback) {
    var payload = {
      name: name,
      prompt: prompt,
      link: this.state.program_link,
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
        this.fetchProgram(responseJson.link,callback);
      } else {
        console.log('failed');
      }
     });
  }

  fetchProgram(link,callback) {
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
          program_prompt: responseJson.prompt,
          program_name: responseJson.name
        }, () => {if(typeof callback === "function") { callback(); }});
      } else {
        console.log('failed to get');
      }
     });
  }

  render() {
    return(
      <div className="dev">
        <IDE code={this.state.code} updateCode={this.updateCode}/>
        <Browser
          save={this.save}
          updateCode={this.updateCode}
          programName={this.state.program_name}
          programPrompt={this.state.program_prompt}
          fetchProgram={this.fetchProgram}
          newProgram={this.newProgram}
          link={this.state.program_link}
          programs={this.props.programs} />
      </div>
    );
  }
}

export default DevInterface;
