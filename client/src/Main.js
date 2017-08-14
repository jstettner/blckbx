import React, { Component } from 'react';
import Login from './components/Login';
import { Button } from 'react-bootstrap';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: localStorage.getItem('account') != null,
      loginShowing: false
    }
  }

  componentDidMount() {

  }

  logout() {
    localStorage.removeItem('account');
    this.setState({ isLoggedIn: false });
  }

  loginShowingUpdate(value) {
    this.setState({
      loginShowing: value
    });
  }

  render() {
    return (
      <div>
        { this.state.isLoggedIn ? (
          <div className="loaded-app">
            <Button bsStyle="primary" onClick={() => this.logout()}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="login">
            <Button bsStyle="primary" onClick={() => this.loginShowingUpdate(true)}>
              Login
            </Button>
            <Login show={this.state.loginShowing} onHide={() => this.loginShowingUpdate(false)} />
          </div>
        )}
      </div>
    );
  }
}

export default Main;
