import React, { Component } from 'react';
import Login from './components/Login';
import { Button } from 'react-bootstrap';
import IDE from './components/IDE';
import Browser from './components/Browser';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loginShowing: false,
      user: null,
      programs: []
    }
  }

  authenticateToken(token) {
    const data = {
      token: token
    };

    var esc = encodeURIComponent;

    var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');

    fetch(("/tokenauth/?" + query), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.valid) {
        this.setState({
          user: responseJson.user,
          programs: responseJson.programs,
          isLoggedIn: true
        });
      } else {
        console.log('tokenInvalid');
      }
    });
  }

  componentDidMount() {
    if(localStorage.getItem('accountData') != null) {
      this.authenticateToken(localStorage.getItem('accountData'));
    }
  }

  logout() {
    localStorage.removeItem('accountData');
    this.setState({ isLoggedIn: false });
    this.loginShowingUpdate(false);
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
          <div className="loaded-app"> {/* Logged in state */}
            <h3>Welcome back, {this.state.user}</h3>
            <Button bsStyle="primary" onClick={() => this.logout()}>
              Logout
            </Button>
            <IDE />
            <Browser programs={this.state.programs}/>
          </div>
        ) : (
          <div className="login"> {/* Logged out State */}
            <Button bsStyle="primary" onClick={() => this.loginShowingUpdate(true)}>
              Login
            </Button>
            <Login show={this.state.loginShowing} onLogin={this.authenticateToken.bind(this)} onHide={() => this.loginShowingUpdate(false)} />
          </div>
        )}
      </div>
    );
  }
}

export default Main;
