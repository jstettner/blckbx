import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';

class Browser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      prompt: ""
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

  handleNameChange(e) {
    this.setState({name:e.target.value});
  }

  handlePromptChange(e) {
    this.setState({prompt:e.target.value});
  }

  render() {
    var programs = this.props.programs;

    return(
      <div className="browser">
        <div className="flex-row flex-center pv-10 flex-between">
          <div className="flex-row">
            <span className="ph-5">Name:</span>
            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
          </div>
          <div className="flex-row">
            <span className="ph-5">Prompt:</span>
            <input type="text" name="name" value={this.state.prompt} onChange={this.handlePromptChange.bind(this)}/>
          </div>
        </div>
        <ListGroup>
          <div className="flex-row">
            {/* MAKE SURE THIS NEW PROGRAM CHANGES CURRENT LINK AFTER ADDING PROGRAM EDITS */}
            <ListGroupItem className="width-70" key={1} onClick={() => this.props.newProgram()}>
              <Glyphicon glyph="plus" /> Program
            </ListGroupItem>
            <Button className="width-30" bsStyle="primary" onClick={() => this.props.save(this.state.name, this.state.prompt)}>
              <Glyphicon glyph="save" /> Save
            </Button>
          </div>
          { programs.map(program =>
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
