import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import AceEditor from 'react-ace';
import { Glyphicon } from 'react-bootstrap';
import 'brace/mode/javascript';
import 'brace/theme/chaos';

const Instructions = () => (
  <div className="instructions">
    <Header toApp={true} />
    <div className="container">
      <h1 className="light-sea">Help</h1>
      <h2 className="deeper-sea">What is BlckBx?</h2>
      <h4 className="text-color">
        BlckBx is a platform for devs by devs. It allows for the quick scripting of single applications, with no UI needed.
        <br />
        Users can draft and send small algorithms to friends/coworkers who need no programming knowledge to use.
      </h4>
      <h2 className="deeper-sea">How do I get started?</h2>
      <h4 className="text-color">
        Simply signup/login and get access to BlckBx's IDE. Enter your script, pick a name, and a prompt, and save the program.
        <br />
        Once your program is saved, click generate to make a custom link with your program running in the shell.
        <br />
        <br/>
        It's as simple as that.
        <br/>
        <br />
        <span className="basic-grey">
          Tip: You can log back in and edit your programs at any time, any previous links you have shared will automatically update with any code, name, or prompt changed you have made.
        </span>
      </h4>
      <h2 className="deeper-sea">Examples uses:</h2>
      <h4 className="text-color">
        <Link className="deep-sea" to="/program/59a0d6923d76cc02626b7bf2"> <Glyphicon glyph="link" className="prm" />Averaging numbers </Link>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="chaos"
          value={"function main(x) {\r\n    var nums = x.split(' ');\r\n    var sum = nums.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);\r\n    var res = sum/nums.length;\r\n\treturn res;\r\n}\r\n"}
          name="ace"
          width="100%"
          height="200px"
          readOnly={true}
          editorProps={{$blockScrolling: true}}
        />
        <br/>
        <Link className="deep-sea" to="/program/59a1dfe325d66b0e2321041b"> <Glyphicon glyph="link" className="prm" />Fibonacci Generator </Link>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="chaos"
          value={"function fib(n) {\r\n    if(n <= 1) {\r\n        return n;\r\n    } else {\r\n        return fib(n - 1) + fib(n - 2);\r\n    }\r\n}\r\n\r\nfunction main(x) {\r\n\treturn fib(x);\r\n}\r\n"}
          name="ace"
          width="100%"
          height="200px"
          readOnly={true}
          editorProps={{$blockScrolling: true}}
        />
        <br/>
        <Link className="deep-sea" to="/program/59a1d7a43d76cc02626b7bf9"> <Glyphicon glyph="link" className="prm" />Fortune Teller </Link>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="chaos"
          value={"function main(x) {\r\n    var rand = Math.floor((Math.random() * 30) + 1);\r\n    var fortunes = [\r\n        'You will have the best year of your life',\r\n        'Tomorrow will be bad, but the next day will make up for it',\r\n        'Good luck is right around the corner',\r\n        'You will get a promotion',\r\n        'Be careful for the next few days',\r\n        'You will have great success in what you least expect'\r\n        ];\r\n        \r\n    var res = fortunes[(x*rand)%6];\r\n\treturn res;\r\n}\r\n"}
          name="ace"
          width="100%"
          height="200px"
          readOnly={true}
          editorProps={{$blockScrolling: true}}
        />
        <br/>
        <Link className="deep-sea" to="/program/59a1d9d43d76cc02626b7bfc"> <Glyphicon glyph="link" className="prm" />Secret Message </Link>
        <AceEditor
          className="mt-10"
          mode="javascript"
          theme="chaos"
          value={"function main(x) {\r\n    return (x==='secretpass' ? 'secret info' : 'incorrect password');\r\n}"}
          name="ace"
          width="100%"
          height="200px"
          readOnly={true}
          editorProps={{$blockScrolling: true}}
        />
      </h4>
    </div>
  </div>
);

export default Instructions;
