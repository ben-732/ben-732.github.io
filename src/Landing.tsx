import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

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
        className="w-full h-screen  bg-deep-blue bg-no-repeat bg-contain bg-right-top"
        style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className="w-96 absolute top-36 left-24 text-white ">
          <span className="text-3xl text-white block font-extralight mb-2 border-b-2 ">
            Ben McMurtrie
          </span>
          <div className="text-sm">
            Software Engineering Student at the University of Auckland
          </div>
          <div>
            <a href="https://github.com/ben-732/">
              <AiFillGithub className="text-2xl inline-block" />
            </a>
            <a href="https://www.linkedin.com/in/ben-mcmurtrie-846689246//">
              <AiFillLinkedin className="text-2xl inline-block ml-2" />
            </a>
          </div>

          <div className="mt-4 ">
            <span
              className="hover:scale-105 transition-all cursor-pointer inline-block text-left"
              onClick={() => scroll()}
            >
              My Projects
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
