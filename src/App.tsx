import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Card from "./components/Card";

function App() {
  return (
    <div className="w-full h-screen overflow-x-hidden scroll-smooth pageBackground flex p-20 flex-wrap">
      <div className="lg: w-1/2 min-w-max mr-24">
        <div className="">
          <span className="text-lg text-white ">Hello, I am</span>
          <h1 className="text-7xl font-extrabold text-white pt-0">
            Ben <br></br>McMurtrie
          </h1>
          <div className="flex flex-col m-2 text-gray-200">
            <GlowText section="projects">Developer</GlowText>
            <GlowText section="education">
              Student at the University of Auckland
            </GlowText>
            <GlowText section="experience">
              Software Engineering Intern at Tidy International
            </GlowText>
          </div>
        </div>

        <div className="links-section">
          <div className="flex flex-row justify-around max-w-md mt-16">
            <Card
              hover
              rotate={-10}
              href="https://www.linkedin.com/in/benmcmurtrie/"
              target="_blank"
              className="mt-4"
            >
              <AiFillLinkedin size="48" />
            </Card>
            <Card
              hover
              rotate={4}
              href="https://github.com/ben-732"
              target="_blank"
            >
              <AiFillGithub size="48" />
            </Card>
          </div>
        </div>
      </div>
      <div className="flex-grow-[2]" />
      <div className=" mt-40">
        <Card className="w-full block w-[400px]" rotate={2}>
          <div className="flex flex-col items-center w-full">
            <span className="font-medium text-xl">🚧 Work in progress 🚧</span>
          </div>
        </Card>
      </div>
      <div className="flex-grow-[1]" />
    </div>
  );
}

function GlowText({
  children,
  section,
}: {
  children: React.ReactNode;
  section: string;
}) {
  return <span className=" text-white text-xl leading-tight">{children}</span>;
}

export default App;
