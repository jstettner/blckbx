import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

const Header = (props) => (
  <div className="header">
    <div className={"container flex-row" + (props.signedIn ? " flex-between" : "")}>
      <h1 className="light-sea">BlckBx</h1>
      {props.signedIn &&
        <div className="flex-row flex-center">
          <h4 className="deep-sea prm">Signed in as: <span className="light-sea">{props.name}</span>!</h4>
          <Button className="btn-dark" onClick={() => this.logout()}>
            <Glyphicon className="prm" glyph="alert" />Logout
          </Button>
        </div>
      }
    </div>
  </div>
);

export default Header;
