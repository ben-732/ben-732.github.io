import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import Landing from "./Landing";
import Projects from "./Projects";

function App() {
  return (
    <div
      className="w-full bg-cover overflow-x-hidden scroll-smooth"
      // style={{ backgroundImage: `url(${background_img})` }}
    >
      <Landing />
      <Projects />
    </div>
  );
}

export default App;
