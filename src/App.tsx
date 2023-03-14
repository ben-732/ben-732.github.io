import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import background_img from "./images/Bigbackground.jpg";
import Landing from "./Landing";
import Projects from "./Projects";

function App() {
  console.log(background_img);
  return (
    <div
      className="w-screen  bg-cover"
      // style={{ backgroundImage: `url(${background_img})` }}
    >
      <Landing />
      <Projects />
    </div>
  );
}

export default App;
