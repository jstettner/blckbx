import React, { Component } from 'react';
import Login from './Login';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: localStorage.getItem('account') != null
    }
  }

  componentDidMount() {
    console.log(this.state.isLoggedIn ? 'Logged in' : 'Logged out');
  }

  render() {
    return (
      <div>
        { this.state.isLoggedIn ? (
          <h1>Main App</h1>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default Main;
