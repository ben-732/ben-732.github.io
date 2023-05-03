import React from "react";

import { AiFillGithub } from "react-icons/ai";
import { DiNodejsSmall } from "react-icons/di";
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";

const techIcons: { [index: string]: JSX.Element } = {
  NodeJS: <DiNodejsSmall />,
  React: <IoLogoReact />,
  TypeScript: <SiTypescript />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  TailwindCSS: <SiTailwindcss />,
  NextJS: <SiNextdotjs />,
};

function Skills() {
  return (
    <>
      <div
        className=" h-screen mt-screen  bg-gradient-to-b bg-black flex flex-col items-center  "
        // style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className=" h-full flex-col flex pt-20 mx-2 sm:mx-0 md:w-4/5 items-center lg:items-start">
          <span className="text-white text-3xl lg:ml-4 mt-2 font-extralight mb-4 block">
            Skills
          </span>
        </div>
      </div>
    </>
  );
}

export default Skills;
