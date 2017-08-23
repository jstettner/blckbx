import React, { Component } from 'react';
import App from './App';
import Programview from './views/Programview';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Routes extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/program/:link' component={Programview}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
