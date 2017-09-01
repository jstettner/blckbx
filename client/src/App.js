import React, { Component } from 'react';
import './App.min.css';
import Main from './Main';
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      signedIn: false
    }

    this.setName = this.setName.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  setName(name,signedIn) {
    this.setState({
      name: name,
      signedIn: signedIn
    });
  }

  logout() {
    this.child.logout();
  }

  login() {
    this.child.login();
  }

  render() {
    return (
      <div className="App">
        <Header name={this.state.name} signedIn={this.state.signedIn} logout={this.logout} login={this.login}/>
        <div className="container">
          <Main setParent={this.setName} ref={ref => (this.child = ref)}/>
        </div>
      </div>
    );
  }
}

export default App;
