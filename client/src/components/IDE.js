import React, { Component } from 'react';
// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

class IDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({code: nextProps.code});
    // this.ace.editor.setValue(nextProps.code);
  }

  render() {
    // const code_options = {
    //   mode: "javascript",
    //   lineNumbers: true,
    //   theme: 'monokai'
    // };

    return(
      <div>
        <AceEditor
          className="width-100"
          mode="java"
          theme="github"
          value={this.state.code}
          onChange={this.props.updateCode}
          name="ace"
          editorProps={{$blockScrolling: true}}
        />
        {/* <CodeMirror className="ptm" value={this.state.code} onChange={this.props.updateCode} options={code_options}/> */}
      </div>
    );
  }
}

export default IDE;
