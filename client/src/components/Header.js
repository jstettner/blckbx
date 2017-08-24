import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

const Header = (props) => (
  <div className="header">
    <div className="container height-100">
      <div className={"flex-row flex-center height-100" + (props.signedIn ? " flex-between" : "")}>
        <h1 className="light-sea mtn mbn">BlckBx</h1>
        {props.signedIn &&
          <div className="flex-row flex-center">
            <h4 className="deep-sea prm mtn mbn">Signed in as: <span className="light-sea">{props.name}</span>!</h4>
            <Button className="btn-dark" onClick={() => props.logout()}>
              <Glyphicon className="prm" glyph="alert" />Logout
            </Button>
          </div>
        }
      </div>
    </div>
  </div>
);

export default Header;
