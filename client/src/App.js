import React, { Component } from 'react';
import './App.min.css';
import Main from './Main';
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      signedIn: true
    }

    this.setName = this.setName.bind(this);
  }

  setName(name) {
    console.log(name);
    this.setState({
      name: name
    });
  }

  render() {
    return (
      <div className="App">
        <Header name={this.state.name} signedIn={this.state.signedIn}/>
        <div className="container">
          <Main setName={this.setName} />
        </div>
      </div>
    );
  }
}

export default App;
