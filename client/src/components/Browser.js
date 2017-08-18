import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';

class Browser extends Component {
  constructor() {
    super();
    this.state ={
      name: 'untitled'
    }
  }

  handleNameChange(e) {
    this.setState({name:e.target.value});
  }

  handleSelect(id) {
    console.log(id);
  }

  render() {
    var programs = this.props.programs;

    return(
      <div className="browser">
        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        <ListGroup>
          <div className="flex-row">
            <ListGroupItem className="width-70" key={1} onClick={() => this.handleSelect(1)}>
              <Glyphicon glyph="plus" /> Program
            </ListGroupItem>
            <Button className="width-30" bsStyle="primary" onClick={() => this.props.save(this.state.name)}>
              <Glyphicon glyph="save" /> Save
            </Button>
          </div>
          { programs.map(program =>
            <ListGroupItem key={program.id} onClick={() => this.handleSelect(program.id)}>
              <Glyphicon glyph="edit" /> {program.name}
            </ListGroupItem>
          ) }
        </ListGroup>
      </div>
    );
  }
}

export default Browser;
