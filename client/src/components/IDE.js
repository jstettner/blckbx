import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class IDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({code: nextProps.code});
  }

  render() {
    return(
      <div>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="monokai"
          value={this.state.code}
          onChange={this.props.updateCode}
          name="ace"
          width="100%"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

export default IDE;
