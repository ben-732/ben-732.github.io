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

import { CgWebsite } from "react-icons/cg";

const techIcons: { [index: string]: JSX.Element } = {
  NodeJS: <DiNodejsSmall />,
  React: <IoLogoReact />,
  TypeScript: <SiTypescript />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  TailwindCSS: <SiTailwindcss />,
  NextJS: <SiNextdotjs />,
};

const projectsList = [
  {
    name: "Personal Website",
    description: "",
    github: "https://github.com/ben-732/ben-732.github.io",
    website: "#home",
    technologies: ["React", "TailwindCSS", "TypeScript"],
  },
  {
    name: "Recipe Book",
    description: "Recipe Book built with NextJS and MongoDB.",
    github: "https://github.com/ben-732/recipes",
    technologies: ["NextJS", "MongoDB", "TailwindCSS", "TypeScript"],
  },
  {
    name: "Fuel Tracker",
    description: "React PWA to track my fuel consumption and efficiency.",
    github: "https://github.com/ben-732/fuel-tracker",
    technologies: ["React", "TailwindCSS", "TypeScript"],
  },
];

function Projects() {
  return (
    <>
      <div
        className=" h-screen mt-screen  bg-gradient-to-b from-[#010105] bg-purple-900 flex flex-col items-center  "
        // style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className=" h-full flex-col flex pt-20 mx-2 sm:mx-0 md:w-4/5 items-center lg:items-start">
          <span className="text-white text-3xl lg:ml-4 mt-2 font-extralight mb-4 block">
            My Projects
          </span>
          <div className="flex flex-row flex-wrap justify-center items-start">
            {projectsList.map((project) => {
              return (
                <div className="flex flex-col text-white w-80 sm:w-96 m-2 p-5  sm:p-6 rounded-2xl  flex-wrap transition-all hover:scale-[1.02] bg-deep-blue bg-opacity-70">
                  <div className="flex flex-row items-center">
                    <span className="text-white text-xl  block">
                      {project.name}
                    </span>
                    <span className="flex-grow"></span>
                    {project.website && project.website.length > 0 && (
                      <a className="mr-2" href={project.website}>
                        <CgWebsite className="text-2xl inline-block" />
                      </a>
                    )}

                    <a href={project.github}>
                      <AiFillGithub className="text-2xl inline-block" />
                    </a>
                  </div>
                  <div className="mt-1 text-md">{project.description}</div>
                  <div className="mt-2 flex flex-row flex-wrap w-full gap-2">
                    {project.technologies.map((tech) => {
                      return (
                        <div className="flex flex-row items-center justify-center bg-white text-black rounded-md px-2 py-1  ">
                          <span className="text-lg mr-1">
                            {techIcons[tech]}
                          </span>
                          <span className="text-md font-medium">{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
