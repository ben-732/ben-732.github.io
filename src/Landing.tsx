import React from "react";

import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineArrowDown,
} from "react-icons/ai";

import background_img from "./images/bg_small_fade-2.png";

function Landing() {
  console.log(background_img);
  function scroll(section: number) {
    window.scroll({
      top: window.innerHeight * section,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      {" "}
      <div
        id="home"
        className="h-screen overflow-x-hidden bg-deep-blue bg-no-repeat md:bg-contain bg-cover bg-[center_top] md:bg-right-top md flex flex-col lg:items-start items-center"
        style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className="flex flex-col  text-white min-w-min max-w-lg lg:pt-40 lg:pl-20 pt-20 items-center">
          <div className="lg:bg-transparent text-center lg:text-left bg-black rounded-lg p-6 lg:p-4 bg-opacity-60 mx-4">
            <span className="text-3xl text-white block font-extralight mb-1 border-b-1 pr-4 ">
              Ben McMurtrie
            </span>
            <div className="text-md mb-1">
              Part II Software Engineering Student at the University of Auckland
            </div>
            <div>
              <a href="https://github.com/ben-732/">
                <AiFillGithub className="text-2xl inline-block" />
              </a>
              <a href="www.linkedin.com/in/ben732/">
                <AiFillLinkedin className="text-2xl inline-block ml-2" />
              </a>
            </div>
            <div className="mt-2 flex flex-col items-center lg:items-start ">
              <span
                className=" transition-all  hover:text-purple-300 cursor-pointer  text-left mt-4 rounded-lg flex flex-row items-center"
                onClick={() => scroll(1)}
              >
                <span>About Me</span>
                <span className="text-xl ml-1">
                  <AiOutlineArrowDown />
                </span>
              </span>
              <span
                className=" transition-all   hover:text-purple-300 cursor-pointer  text-left mt-4 rounded-lg flex flex-row items-center"
                onClick={() => scroll(2)}
              >
                <span>My Projects</span>
                <span className="text-xl ml-1">
                  <AiOutlineArrowDown />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
