import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'login',
      validationErrors: {
        user: { inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      responseErrors: {
        user: { taken: false, notfound: false },
        password: { wrong: false}
      },
      user: "",
      pass: "",
      confirm: "",
      invalid: true
    };
  }

  componentDidMount() {
    this.setState({
      mode: (this.props.mode || '')
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode
    });
  }

  toSignup() {
    this.setState({
      mode: 'signup',
      validationErrors: {
        user: { inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      responseErrors: {
        user: { taken: false, notfound: false },
        password: { wrong: false}
      },
      confirm: "",
      invalid: true
    });
  }

  toLogin() {
    this.setState({
      mode: 'login',
      validationErrors: {
        user: { inval: true },
        pass: { inval: true },
        confirm: { inval: true }
      },
      messages: {
        registered: false
      },
      responseErrors: {
        user: { taken: false, notfound: false },
        password: { wrong: false}
      },
      confirm: "",
      invalid: true
    });
  }

  authAccount() {
    this.setState({
      responseErrors: {
        user: { taken: false, notfound: false },
        password: { wrong: false}
      }
    });
    const data = {
      user: this.state.user,
      pass: this.state.pass,
    };

    var esc = encodeURIComponent;

    var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');

    fetch(("api/login/?" + query), {
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
        this.props.onHide();
        window.location.reload();
      } else {
        if(responseJson.error === 'user not found') {
          this.setState({
            responseErrors: {
              ...this.state.responseErrors,
              user: {
                ...this.state.responseErrors.user,
                notfound: true
              }
            }
          });
        } else if(responseJson.error === 'password incorrect') {
          this.setState({
            responseErrors: {
              ...this.state.responseErrors,
              password: {
                ...this.state.responseErrors.pass,
                wrong: true
              }
            }
          });
        }
      }
    });
  }

  signUp() {
    var payload = {
      user: this.state.user,
      pass: this.state.pass
    }

    fetch('api/signup', {
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
        }, () => this.authAccount());
      } else {
        if(responseJson.errors.includes('already exists')) {
          this.setState({
            responseErrors: {
              ...this.state.responseErrors,
              user: {
                ...this.state.responseErrors.user,
                taken: true
              }
            }
          });
        }
      }
     });
  }

  checkValid(name, value) {
    if(this.state.mode === 'signup') {
      this.setState({
        invalid: (this.state.validationErrors.user.inval ||
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
            <Modal.Title id="contained-modal-title-lg" className="light-sea">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex-column flex-center">
            <form className="flex-column flex-center width-70 width-100-mobile width-100-tablet">
              <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={!this.state.user ? 'error' : 'success'}>
                <ControlLabel className="f-18">Username:</ControlLabel>
                <FormControl type="text" name="user" value={this.state.user} onChange={this.handleInputChange.bind(this)}/>
                {!this.state.user && <HelpBlock>Cannot be blank.</HelpBlock>}
              </FormGroup>
              <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={!this.state.pass ? 'error' : 'success'}>
                <ControlLabel className="f-18">Password:</ControlLabel>
                <FormControl type="password" name="pass" value={this.state.pass} onChange={this.handleInputChange.bind(this)}/>
                {!this.state.pass && <HelpBlock>Cannot be blank.</HelpBlock>}
              </FormGroup>
              <FormGroup className="mbn" validationState={'error'}>
                {this.state.responseErrors.user.notfound && <HelpBlock className="f-18">User not found.</HelpBlock>}
                {this.state.responseErrors.password.wrong && <HelpBlock className="f-18">Password incorrect.</HelpBlock>}
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-dark" onClick={() => this.toSignup()}>Signup</Button>
            <Button className="btn-dark" onClick={() => this.authAccount()} disabled={this.state.invalid}>Submit</Button>
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
            <Modal.Title id="contained-modal-title-lg" className="light-sea">Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex-column flex-center">
            <form className="flex-column flex-center width-70 width-100-tablet width-100-mobile">
              <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={this.state.validationErrors.user.inval ? 'error' : 'success'}>
                <ControlLabel className="f-18">Username:</ControlLabel>
                <FormControl type="text" name="user" value={this.state.user} onChange={this.handleInputChange.bind(this)}/>
                {this.state.validationErrors.user.inval && <HelpBlock>Username must be between 6 to 20 characters, and contain only alphanumeric characters, underscores, and dots. Symbols can't be consecutive, leading, or trailing.</HelpBlock>}
              </FormGroup>
              <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={this.state.validationErrors.pass.inval ? 'error' : 'success'}>
                <ControlLabel className="f-18">Password:</ControlLabel>
                <FormControl type="password" name="pass" value={this.state.pass} onChange={this.handleInputChange.bind(this)}/>
                {this.state.validationErrors.pass.inval && <HelpBlock>Password must be 8 characters or more, and contain at least one digit.</HelpBlock>}
              </FormGroup>
              <FormGroup className="width-100 width-100-mobile width-100-tablet" validationState={this.state.validationErrors.confirm.inval ? 'error' : 'success'}>
                <ControlLabel className="f-18">Retype Password:</ControlLabel>
                <FormControl type="password" name="confirm" value={this.state.confirm} onChange={this.handleInputChange.bind(this)}/>
                {this.state.validationErrors.confirm.inval && <HelpBlock>Must match password.</HelpBlock>}
              </FormGroup>
              <FormGroup className="mbn" validationState={'error'}>
                {this.state.responseErrors.user.taken && <HelpBlock className="f-18">Username taken.</HelpBlock>}
              </FormGroup>
            </form>
            {this.state.messages.registered && (
              <p className="text-center ptl">Successfully registered! Please head over to the <a onClick={() => this.toLogin()}>login</a> page, and sign in with your new account.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-dark" onClick={() => this.toLogin()}>Login</Button>
            <Button className="btn-dark" onClick={() => this.signUp()} disabled={this.state.invalid}>Submit</Button>
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
