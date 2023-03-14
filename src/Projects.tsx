import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import background_img from "./images/projects.jpg";

function Projects() {
  console.log(background_img);
  return (
    <>
      <div
        className="w-full h-screen mt-screen  bg-deep-blue "
        // style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className="w-full h-full flex">
          <span className="text-white text-2xl font-extralight mt-20 ml-20 block">
            My Projects
          </span>
        </div>
      </div>
    </>
  );
}

export default Projects;
