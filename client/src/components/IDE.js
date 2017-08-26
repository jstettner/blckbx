import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'brace/mode/javascript';
import 'brace/theme/chaos';

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
        <div className="flex-row tools">
          <Button className="mv-5 mr-5 width-20 btn-mid" onClick={() => this.props.save()}>
            <Glyphicon glyph="cloud-upload" /> Save
          </Button>
          <Link className="mv-5 mh-5 width-20" to={'/program/' + this.props.link} target="_blank">
            <Button bsStyle="primary">
              <Glyphicon glyph="circle-arrow-right" /> Generate
            </Button>
          </Link>
        </div>
        <div className="mb-10 basic-grey">Note: You must save before generating if you made changes</div>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="chaos"
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
