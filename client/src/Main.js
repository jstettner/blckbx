import React, { Component } from 'react';
import Login from './components/Login';
import DevInterface from './views/DevInterface';
import Landing from './views/Landing';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loginShowing: false,
      user: null,
      programs: [],
      mode: 'login'
    }

    this.authenticateToken = this.authenticateToken.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  authenticateToken(token) {
    const data = {
      token: token
    };

    var esc = encodeURIComponent;

    var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');

    fetch(("api/tokenauth/?" + query), {
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
        this.props.setParent(this.state.user,true);
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
    this.props.setParent(this.state.user,false);
  }

  login() {
    this.setState({
      mode: 'login'
    });
    this.loginShowingUpdate(true)
  }

  signup() {
    this.setState({
      mode: 'signup'
    });
    this.loginShowingUpdate(true);
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
            <DevInterface reauth={this.authenticateToken} programs={this.state.programs} />
          </div>
        ) : (
          <div className="login"> {/* Logged out State */}
            <Landing updateLogin={this.signup}/>
          </div>
        )}
        <Login show={this.state.loginShowing} onLogin={this.authenticateToken.bind(this)} onHide={() => this.loginShowingUpdate(false)} mode={this.state.mode}/>
      </div>
    );
  }
}

export default Main;
