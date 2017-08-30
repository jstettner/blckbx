import React, { Component } from 'react';
import App from './App';
import About from './views/About';
import Instructions from './views/Instructions';
import Programview from './views/Programview';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ReactGA from 'react-ga';

class Routes extends Component {
  constructor() {
    ReactGA.initialize('UA-105645785-1');
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/program/:link' component={Programview}/>
          <Route path='/about' component={About}/>
          <Route path='/instructions' component={Instructions}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
