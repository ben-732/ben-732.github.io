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

      <Card hover rotate={10} href="https://github.com/ben-732" target="_blank">
        <AiFillGithub size="48" />
      </Card>
    </div>
  );
}

export default App;
