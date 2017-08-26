import React from 'react';
import Header from '../components/Header';

const Instructions = () => (
  <div className="instructions">
    <Header />
    <div className="container">
      <h1 className="light-sea">Help</h1>
      <h2 className="deeper-sea">What is BlckBx?</h2>
      <h4 className="text-color">
        BlckBx is a platform for devs by devs. It allows for the quick scripting of single applications, with no UI needed.
        <br />
        Users can draft and send small algorithms to friends/coworkers who need to programming knowledge to use.
      </h4>
      <h2 className="deeper-sea">How do I get started?</h2>
      <h4 className="text-color">
        Simply signup/login and get access to BlckBx's IDE. Enter your script, pick a name, and a prompt, and save the program.
        <br />
        Once your program is saved, click generate to make a custom link with your program running in the shell.
        <br />
        <br />
        <span className="basic-grey">
          Tip: You can log back in and edit your programs at any time, any previous links you have shared will automatically update with any code, name, or prompt changed you have made.
        </span>
      </h4>
    </div>
  </div>
);

export default Instructions;
