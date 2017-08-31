import React, { Component } from 'react';
import App from './App';
import About from './views/About';
import Instructions from './views/Instructions';
import Programview from './views/Programview';
import Footer from './components/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ReactGA from 'react-ga';

class Routes extends Component {
  constructor() {
    super();
    ReactGA.initialize('UA-105645785-1');
  }

  render() {
    return(
      <div className="wrap">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/program/:link' component={Programview}/>
            <Route path='/about' component={About}/>
            <Route path='/instructions' component={Instructions}/>
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default Routes;
