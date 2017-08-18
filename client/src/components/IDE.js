import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');

class IDE extends Component {
  render() {
    const code_options = {
      mode: "javascript",
      lineNumbers: true,
      theme: 'monokai'
    };
    return(
      <div>
        <CodeMirror className="ptm" value={this.props.code} onChange={this.props.updateCode} options={code_options}/>
      </div>
    );
  }
}

export default IDE;
