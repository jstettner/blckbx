import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';

class Browser extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    this.setState({name:this.props.programName});
  }

  handleNameChange(e) {
    this.setState({name:e.target.value});
  }

  render() {
    var programs = this.props.programs;

    return(
      <div className="browser">
        <div className="flex-row flex-center pv-10">
          <span className="ph-5">Name:</span>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        </div>
        <ListGroup>
          <div className="flex-row">
            <ListGroupItem className="width-70" key={1} onClick={() => console.log('new program')}>
              <Glyphicon glyph="plus" /> Program
            </ListGroupItem>
            <Button className="width-30" bsStyle="primary" onClick={() => this.props.save(this.state.name)}>
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
