import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Glyphicon, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import 'brace/mode/javascript';

class IDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      code: this.props.code
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({code: nextProps.code});
  }

  redirect() {
    browserHistory.push('/program/' + this.props.link);
    window.location.reload();
  }

  generate() {
    this.props.save(this.redirect.bind(this));
  }

  render() {

    return(
      <div>
        {this.props.link ? (
          <h2 className="deeper-sea">Editing Program: {this.props.name || 'Untitled'}</h2>
        ) : (
          <h2 className="deeper-sea">New Program: {this.props.name || 'Untitled'}</h2>
        )}
        <div className="flex-row tools">
          <Button className="mv-5 mr-5 width-20 btn-mid" disabled={!this.props.name} onClick={() => this.props.save()}>
            <Glyphicon glyph="cloud-upload" /> Save
          </Button>
          <Button bsStyle="primary" className="mv-5 mh-5 width-20" disabled={!this.props.name} onClick={() => this.generate()}>
            <Glyphicon glyph="circle-arrow-right" /> Generate
          </Button>
        </div>
        {!this.props.name && <div className="error">Your program must have a name before saving.</div>}
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
