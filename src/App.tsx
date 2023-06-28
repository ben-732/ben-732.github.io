import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import Landing from "./Landing";
import Projects from "./Projects";
import Skills from "./Skills";
import NavBar from "./NavBar";
import About from "./About";

function App() {
  return (
    <div
      className="w-full bg-cover overflow-x-hidden scroll-smooth"
      // style={{ backgroundImage: `url(${background_img})` }}
    >
      <NavBar />
      <Landing />
      <About />
      <Projects />
      {/* <Skills /> */}
    </div>
  );
}

export default App;
