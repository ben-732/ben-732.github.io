import React from "react";

import { AiFillGithub } from "react-icons/ai";
import { DiNodejsSmall } from "react-icons/di";
import { SiTypescript, SiMongodb, SiExpress } from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";

const techIcons: { [index: string]: JSX.Element } = {
  NodeJS: <DiNodejsSmall />,
  React: <IoLogoReact />,
  TypeScript: <SiTypescript />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
};

const projectsList = [
  {
    name: "Project 1",
    description: "This is a project, Here is some more info about it",
    github: "https://github.com/ben-732/budget-no",
    technologies: ["React", "TypeScript", "NodeJS"],
  },
  {
    name: "Project 2",
    description: "This is another project, there is no more info",
    github: "https://github.com/ben-732/l3digi",
    technologies: ["React", "Express", "NodeJS", "MongoDB"],
  },
];

function Projects() {
  return (
    <>
      <div
        className=" h-screen mt-screen  bg-gradient-to-b from-[#010105] bg-purple-900 flex flex-col items-center  "
        // style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className=" h-full flex-col flex pt-20 md:w-4/5 items-center lg:items-start">
          <span className="text-white text-3xl lg:ml-4 mt-2 font-extralight mb-4 block">
            My Projects
          </span>
          <div className="flex flex-row flex-wrap justify-center items-start">
            {projectsList.map((project) => {
              return (
                <div className="flex flex-col text-white w-96 mb-4 p-6 rounded-2xl mr-4 flex-wrap transition-all hover:scale-[1.02] bg-deep-blue bg-opacity-70">
                  <div className="flex flex-row items-center">
                    <span className="text-white text-xl  block">
                      {project.name}
                    </span>
                    <span className="flex-grow"></span>
                    <a href={project.github}>
                      <AiFillGithub className="text-2xl inline-block" />
                    </a>
                  </div>
                  <div className="mt-1 text-md">{project.description}</div>
                  <div className="mt-2 flex flex-row flex-wrap">
                    {project.technologies.map((tech) => {
                      return (
                        <div className="flex flex-row items-center justify-center bg-white text-black rounded-full px-4 py-2 mr-2 mb-2">
                          <span className="text-2xl mr-1">
                            {techIcons[tech]}
                          </span>
                          <span className="text-md font-bold  ">{tech}</span>
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
