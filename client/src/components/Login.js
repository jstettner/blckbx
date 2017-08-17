import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'login',
      validationErrors: {
        user: { taken: false, inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      user: "",
      pass: "",
      confirm: "",
      invalid: true
    };
  }

  toSignup() {
    this.setState({
      mode: 'signup',
      validationErrors: {
        user: { taken: false, inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      user: "",
      pass: "",
      confirm: "",
      invalid: true
    });
  }

  toLogin() {
    this.setState({
      mode: 'login',
      validationErrors: {
        user: { taken: false, inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      user: "",
      pass: "",
      confirm: "",
      invalid: true
    });
  }

  authAccount() {
    // var token = localStorage.getItem('accountData');
    const data = {
      user: this.state.user,
      pass: this.state.pass,
    };

    var esc = encodeURIComponent;

    var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');

    fetch(("/login/?" + query), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.valid) {
        localStorage.setItem('accountData', responseJson.token);
        this.props.onLogin(responseJson.token);
      } else {
        console.log(responseJson.error);
      }
    });
  }

  signUp() {
    var payload = {
      user: this.state.user,
      pass: this.state.pass
    }

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.valid) {
        this.setState({
          messages: {
            registered: true
          }
        });
      } else {
        console.log(responseJson.errors);
      }
     });
  }

  checkValid(name, value) {
    if(this.state.mode === 'signup') {
      this.setState({
        invalid: (this.state.validationErrors.user.taken ||
          this.state.validationErrors.user.inval ||
          this.state.validationErrors.pass.inval ||
          this.state.validationErrors.confirm.inval)
      });
    } else {
      this.setState({
        invalid: (!this.state.user || !this.state.pass)
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    var userspec = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$");
    var passspec = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");

    if(name === 'user'){
       if(!userspec.test(value)) {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            user: { ...this.state.validationErrors.user, inval: true }
          }
        }, () => this.checkValid());
      } else {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            user: { ...this.state.validationErrors.user, inval: false }
          }
        }, () => this.checkValid());
      }
    }

    if(name === 'pass'){
       if(!passspec.test(value)) {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            pass: { inval: true }
          }
        }, () => this.checkValid());
      } else {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            pass: { inval: false }
          }
        }, () => this.checkValid());
      }
    }

    if(name === 'confirm'){
       if(value !== this.state.pass) {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            confirm: { inval: true }
          }
        }, () => this.checkValid());
      } else {
        this.setState({
          validationErrors: {
            ...this.state.validationErrors,
            confirm: { inval: false }
          }
        }, () => this.checkValid());
      }
    }

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
              <label className="pv-5">
                <span className="prm">Username:</span>
                <input type="text" name="user" value={this.state.user} onChange={this.handleInputChange.bind(this)}/>
              </label>
              <label className="pv-5">
                <span className="prm">Password:</span>
                <input type="text" name="pass" value={this.state.pass} onChange={this.handleInputChange.bind(this)}/>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toSignup()}>Signup</Button>
            <Button onClick={() => this.authAccount()} disabled={this.state.invalid}>Submit</Button>
          </Modal.Footer>
        </div>
      );
    } else if(this.state.mode === 'signup'){
      /*
        TODO:
        - add visible error messages
        - get 'taken' error from server and display message
      */
      return(
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="flex-column flex-center text-center">
              <label className="pv-5">
                <span className="prm">Username:</span>
                <input type="text" name="user" value={this.state.user} onChange={this.handleInputChange.bind(this)}/>
              </label>
              <label className="pv-5">
                <span className="prm">Password:</span>
                <input type="text" name="pass" value={this.state.pass} onChange={this.handleInputChange.bind(this)}/>
              </label>
              <label className="pv-5">
                <span className="prm">Retype Password:</span>
                <input type="text" name="confirm" value={this.state.confirm} onChange={this.handleInputChange.bind(this)}/>
              </label>
            </form>
            {this.state.messages.registered && (
              <p className="text-center ptl">Successfully registered! Please head over to the <a onClick={() => this.toLogin()}>login</a> page, and sign in with your new account.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toLogin()}>Login</Button>
            <Button onClick={() => this.signUp()} disabled={this.state.invalid}>Submit</Button>
          </Modal.Footer>
        </div>
      );
    }
    return(<h5>Internal state error. Please reload.</h5>);
  }

  render() {
    // prop consumer
    const { onLogin, ...rest } = this.props;
    return (
      <Modal {...rest} bsSize="large" aria-labelledby="contained-modal-title-lg">
        { this.renderBody() }
      </Modal>
    );
  }
};

export default Login;
