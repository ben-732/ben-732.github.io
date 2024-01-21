import React from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";

import Card from "./components/Card";
import SpotifySong from "./components/SpotifySong";
import GithubActivity from "./components/GithubActivity";

function App() {
  return (
    <div className="w-full h-screen overflow-x-hidden scroll-smooth pageBackground flex p-20 flex-wrap">
      <div className="lg:w-1/2 min-w-max mr-24">
        <div className="">
          <span className="text-lg text-white ">Hello, I am</span>
          <h1 className="text-7xl font-extrabold text-white pt-0">
            Ben <br></br>McMurtrie
          </h1>
          <div className="flex flex-col m-2 text-gray-200">
            <GlowText section="projects">Software Engineer</GlowText>
            <GlowText section="education">
              Studying at the University of Auckland
            </GlowText>
            <GlowText section="experience">
              Interning for Tidy International
            </GlowText>
          </div>
        </div>

        <div className="links-section">
          <div className="flex flex-row justify-around max-w-md mt-24">
            <Card
              hover
              rotate={-10}
              href="https://www.linkedin.com/in/ben732/"
              target="_blank"
              className="w-24 h-24 flex items-center justify-center mt-6"
            >
              <AiFillLinkedin size="64" />
            </Card>
            <Card
              hover
              rotate={4}
              className="w-24 h-24 flex items-center justify-center mt-40 -ml-20"
              href="mailto:mcmurtrie.ben+portfolio@gmail.com"
            >
              <FaEnvelope size="52" />
            </Card>
            <Card
              hover
              rotate={20}
              href="https://github.com/ben-732"
              target="_blank"
              className="w-24 h-24 flex items-center justify-center -ml-10"
            >
              <AiFillGithub size="64" />
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className=" mt-10">
          <GithubActivity rotate={-11}></GithubActivity>
        </div>
        <div className="flex-grow-[2]" />
        <div className=" mt-10">
          <SpotifySong rotate={9}></SpotifySong>
        </div>
        <div className="flex-grow-[1]" />
      </div>
    </div>
  );
}

interface iGlowTextProps {
  children: React.ReactNode;
  section: string;
}

function GlowText({ children }: iGlowTextProps) {
  return <span className=" text-white text-xl leading-tight">{children}</span>;
}

export default App;
