import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');

class IDE extends Component {
  constructor() {
    super();
    this.state = {
      code: null
    }
  }

  updateCode(event) {
    this.setState({
      code: event
    });
  }

  render() {
    const code_options = {
      mode: "javascript",
      lineNumbers: true,
      theme: 'monokai'
    };
    return(
      <div>
        <CodeMirror className="ptm" value={this.state.code} onChange={this.updateCode.bind(this)} options={code_options}/>
      </div>
    );
  }
}

export default IDE;
