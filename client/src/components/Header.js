import React, { Component } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      navOpen: false
    };
  }

  toggle() {
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  render() {
    return(
      <div className={"header " + (this.state.navOpen ? 'open' : '')}>
        <div className="container height-100">
          <div className="height-100 flex-center">
            <div className={"flex-row width-100 width-100-tablet width-100-mobile flex-center flex-between flex-between-tablet flex-column-mobile flex-start-mobile"}>
              <div className="flex-row flex-center pt-5 flex-column-mobile flex-start-mobile width-100-mobile">
                <div className="flex-row flex-between width-100-mobile">
                  <Link to="/"><h1 className="light-sea mtn mbn">BlckBx</h1></Link>
                  <button className="visible-xs f-20 flex-row flex-center outline-none light-sea" onClick={() => this.toggle()}><Glyphicon className={this.state.navOpen && 'hidden'} glyph="chevron-down" /><Glyphicon className={!this.state.navOpen && 'hidden'} glyph="chevron-up" /></button>
                </div>
                <Link to="/instructions"><h2 className={"light-sea pll mtn mbn no-padding-mobile " + (this.state.navOpen ? '' : 'hidden-mobile')}>Help</h2></Link>
                <Link to="/about"><h2 className={"light-sea pll mtn mbn no-padding-mobile " + (this.state.navOpen ? '' : 'hidden-mobile')}>About</h2></Link>
              </div>
              {this.props.toApp ? (
                <div style={{minHeight: '38px'}} className={"flex-row flex-center mv-5 " + (this.state.navOpen ? '' : 'hidden-mobile')}>
                  <Link to="/"><h4 className="text-color prm mtn mbn"><Glyphicon className="prs" glyph="link" /> Back to app <span className="light-sea">{this.props.name}</span></h4></Link>
                </div>
              ) : (
                this.props.signedIn ? (
                  <div className={"flex-row flex-center mv-5 " + (this.state.navOpen ? '' : 'hidden-mobile')}>
                    <h4 className="text-color prm mtn mbn">Signed in as: <span className="light-sea">{this.props.name}</span>!</h4>
                    <Button className="btn-dark" onClick={() => this.props.logout()}>
                      <Glyphicon className="prm" glyph="alert" />Logout
                    </Button>
                  </div>
                ) : (
                  <div className={"mv-5 " + (this.state.navOpen ? '' : 'hidden-mobile')}>
                    <Button className="btn-dark" onClick={() => this.props.login()}>
                      Login
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
