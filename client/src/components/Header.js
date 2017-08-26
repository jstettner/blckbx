import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <div className="header">
    <div className="container height-100">
      <div className="height-100 flex-center">
        <div className={"flex-row width-100 flex-center flex-between"}>
          <div className="flex-row flex-align-end">
            <Link to="/"><h1 className="light-sea mtn mbn">BlckBx</h1></Link>
            <Link to="/instructions"><h2 className="light-sea pll mtn mbn">Help</h2></Link>
            <Link to="/about"><h2 className="light-sea pll mtn mbn">About</h2></Link>
          </div>
          {props.signedIn &&
            <div className="flex-row flex-center">
              <h4 className="text-color prm mtn mbn">Signed in as: <span className="light-sea">{props.name}</span>!</h4>
              <Button className="btn-dark" onClick={() => props.logout()}>
                <Glyphicon className="prm" glyph="alert" />Logout
              </Button>
            </div>
          }
          {props.toApp &&
            <div className=" flex-row flex-center">
              <Link to="/"><h4 className="text-color prm mtn mbn"><Glyphicon className="prs" glyph="link" /> Back to app <span className="light-sea">{props.name}</span></h4></Link>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
);

export default Header;
