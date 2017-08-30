import React, { Component } from 'react';
import IDE from '../components/IDE';
import Browser from '../components/Browser';
import ReactGA from 'react-ga';

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
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePromptChange = this.handlePromptChange.bind(this);
  }

  newProgram() {
    this.setState({
      code: "// Please define the main code in a function called main. This function can be used to call other functions.\n\nfunction main(x) {\n\treturn x;\n}\n",
      program_link: null,
      program_name: "",
      program_prompt: ""
    });
  }

  updateCode(event) {
    this.setState({
      code: event
    });
  }

  componentDidMount() {
    this.newProgram();
    ReactGA.pageview(window.location.pathname);
  }

  save(callback) {
    var payload = {
      name: this.state.program_name,
      prompt: this.state.program_prompt,
      link: this.state.program_link,
      program: this.state.code,
      token: localStorage.getItem('accountData')
    }

    console.log(payload);

    fetch('api/saveprogram', {
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

  handleNameChange(e) {
    console.log(e.target.value);
    this.setState({program_name:e.target.value});
  }

  handlePromptChange(e) {
    this.setState({program_prompt:e.target.value});
  }

  fetchProgram(link,callback) {
    var payload = {
      link: link,
      token: localStorage.getItem('accountData')
    }

    fetch(('api/getProgram'), {
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
      <div className="dev ptm">
        <IDE
          code={this.state.code}
          save={this.save}
          link={this.state.program_link}
          updateCode={this.updateCode} />
        <Browser
          save={this.save}
          updateCode={this.updateCode}
          programName={this.state.program_name}
          programPrompt={this.state.program_prompt}
          fetchProgram={this.fetchProgram}
          handleNameChange={this.handleNameChange}
          handlePromptChange={this.handlePromptChange}
          newProgram={this.newProgram}
          programs={this.props.programs} />
      </div>
    );
  }
}

export default DevInterface;
