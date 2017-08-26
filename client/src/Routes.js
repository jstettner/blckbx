import React, { Component } from 'react';
import App from './App';
import About from './views/About';
import Instructions from './views/Instructions';
import Programview from './views/Programview';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Routes extends Component {
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
