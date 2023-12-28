import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Card from "./components/Card";

function App() {
  return (
    <div className="w-full h-screen overflow-x-hidden scroll-smooth pageBackground">
      <div className="header m-20">
        <span className="text-lg text-white ">Hello, I am</span>
        <h1 className="text-7xl font-extrabold text-white pt-0">
          Ben <br></br>McMurtrie
        </h1>
        <div className="flex flex-col m-2 text-gray-200 leading-tight	">
          <span>Web Developer</span>
          <span>Student at the University of Auckland</span>
          <span>Software Engineering Intern at Tidy International</span>
        </div>
      </div>

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
