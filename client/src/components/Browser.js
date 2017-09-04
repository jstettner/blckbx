import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
        <div className="width-100">
          <div className="input-group pv-10 pb-5 width-100">
            <span className="ph-5 input-group-addon">Name:</span>
            <input className="form-control" type="text" name="name" value={this.props.programName} placeholder="enter a name..." onChange={this.props.handleNameChange}/>
          </div>
          <div className="input-group pv-10 width-100">
            <span className="ph-5 input-group-addon">Prompt:</span>
            <input className="form-control" type="text" name="name" value={this.props.programPrompt} placeholder="enter a prompt to show the user..." onChange={this.props.handlePromptChange}/>
          </div>
        </div>
        <ListGroup className="pv-10">
          <ListGroupItem className="width-70 btn-mid" key={1} onClick={() => this.props.newProgram()}>
            <Glyphicon glyph="plus-sign" /> Program
          </ListGroupItem>
          { this.props.programs.map(program =>
            <ListGroupItem className="btn-mid flex-row flex-between" key={program.link} onClick={() => this.props.fetchProgram(program.link)}>
              <span><Glyphicon glyph="edit" /> {program.name}</span>
              <Glyphicon glyph="trash" className="bright-hover" onClick={() => this.props.deleteM(program.link, program.name)}/>
            </ListGroupItem>
          ) }
        </ListGroup>
      </div>
    );
  }
}

export default Browser;
