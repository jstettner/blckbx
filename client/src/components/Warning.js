import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Warning extends Component {
  constructor() {
    super();

    this.state = {
      confirm: "",
      invalid: true
    }
  }

  componentWillReceiveProps() {
    this.state = {
      confirm: "",
      invalid: true
    }
  }

  checkValid() {
    if(this.state.confirm !== this.props.name) {
      this.setState({
        invalid: true
      });
    } else {
      this.setState({
        invalid: false
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      confirm: e.target.value
    }, () => this.checkValid());
  }

  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg" className="light-sea">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-column flex-center">
          <h1>Program to be deleted: {this.props.name}</h1>
          <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={(this.state.invalid ? 'error' : 'success')}>
            <ControlLabel className="f-18">Type program name to confirm:</ControlLabel>
            <FormControl type="text" name="confirm" onChange={this.handleInputChange.bind(this)}/>
          </FormGroup>
          <FormGroup validationState={'error'}>
            <HelpBlock>Warning: This action cannot be undone!</HelpBlock>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-dark" onClick={() => this.props.onHide()}>Cancel</Button>
          <Button className="btn-dark" disabled={this.state.invalid} onClick={() => this.props.delete(this.props.link)}>Delete Program</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Warning;
