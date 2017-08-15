import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'login',
      showErrors: false,
      validationErrors: {},
      user: null,
      pass: null
    };
  }

  authAccount() {
    const data = {
      user: this.state.user,
      pass: this.state.pass
    };

    var esc = encodeURIComponent;

    var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');

    fetch(("/checkacct/?" + query), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  signUp() {
    var payload = {
      user: this.state.user,
      pass: this.state.pass
    }

    fetch('/addacct', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
  }

  getErrors() {

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  renderBody() {
    if(this.state.mode === 'login') {
      return(
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="flex-column flex-center">
              <label>
                Username:
                <input type="text" name="user" onChange={this.handleInputChange.bind(this)}/>
              </label>
              <label>
                Password:
                <input type="text" name="pass" onChange={this.handleInputChange.bind(this)}/>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ mode: 'signup'})}>Signup</Button>
            <Button onClick={() => this.authAccount()}>Submit</Button>
          </Modal.Footer>
        </div>
      );
    } else if(this.state.mode === 'signup'){
      return(
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="flex-column flex-center">
              <label>
                Username:
                <input type="text" name="user" onChange={this.handleInputChange.bind(this)}/>
              </label>
              <label>
                Password:
                <input type="text" name="pass" onChange={this.handleInputChange.bind(this)}/>
              </label>
            </form>
            <h5>If you already have an account, <a onClick={() => this.setState({ mode: 'login'})}>click here</a></h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.signUp()}>Submit</Button>
          </Modal.Footer>
        </div>
      );
    }
    return(<h5>Internal state error. Please reload.</h5>);
  }

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        { this.renderBody() }
      </Modal>
    );
  }
};

export default Login;
