import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Browser extends Component {
  handleClick(id) {
    console.log(id);
  }

  render() {
    var programs = (this.props.programs || []);

    return(
      <div className="browser">
        <ListGroup>
          { programs.map(program =>
            <ListGroupItem key={program.id} onClick={() => this.handleClick(program.id)}>
              {program.name}
            </ListGroupItem>
          ) }
        </ListGroup>
      </div>
    );
  }
}

export default Browser;
