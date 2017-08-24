import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

class Browser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      prompt: "",
      redirect: false
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.programName,
      prompt: this.props.programPrompt
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.programName,
      prompt: nextProps.programPrompt
    });
  }

  run() {
    this.props.save(this.state.name, this.state.prompt, this.setState({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={'/program/' + this.props.link}/>;
    }

    return(
      <div className="browser">
        <div className="flex-row flex-center pv-10 flex-between">
          <div className="flex-row">
            <span className="ph-5">Name:</span>
            <input type="text" name="name" value={this.props.programName} onChange={this.props.handleNameChange}/>
          </div>
          <div className="flex-row">
            <span className="ph-5">Prompt:</span>
            <input type="text" name="name" value={this.props.programPrompt} onChange={this.props.handlePromptChange}/>
          </div>
        </div>
        <ListGroup>
          <div className="flex-row">
            <Button className="mv-5 mh-5 width-20" bsStyle="default" onClick={() => this.props.save()}>
              <Glyphicon glyph="cloud-upload" /> Save
            </Button>
            <Link className="mv-5 mh-5 width-20" to={'/program/' + this.props.link} target="_blank">
              <Button bsStyle="primary">
                <Glyphicon glyph="circle-arrow-right" /> Run
              </Button>
            </Link>
          </div>
          <span className="pv-5">Note: Please save before running</span>
          <ListGroupItem className="width-70" key={1} onClick={() => this.props.newProgram()}>
            <Glyphicon glyph="plus-sign" /> Program
          </ListGroupItem>
          { this.props.programs.map(program =>
            <ListGroupItem key={program.link} onClick={() => this.props.fetchProgram(program.link)}>
              <Glyphicon glyph="edit" /> {program.name}
            </ListGroupItem>
          ) }
        </ListGroup>
      </div>
    );
  }
}

export default Browser;
