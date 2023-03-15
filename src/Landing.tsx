import React from "react";

import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineArrowDown,
} from "react-icons/ai";

import background_img from "./images/bg_small_fade-2.png";

function Landing() {
  console.log(background_img);
  function scroll() {
    window.scroll({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      {" "}
      <div
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
              <a href="https://www.linkedin.com/in/ben-mcmurtrie-846689246//">
                <AiFillLinkedin className="text-2xl inline-block ml-2" />
              </a>
            </div>
            <div className="mt-2 flex justify-center lg:justify-start">
              <span
                className=" transition-all hover:text-purple-300 cursor-pointer inline-block text-left mt-4 rounded-lg flex flex-row items-center"
                onClick={() => scroll()}
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
