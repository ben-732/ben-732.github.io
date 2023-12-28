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
        <div className="flex flex-col m-2 text-gray-200">
          <GlowText section="projects">Developer</GlowText>
          <GlowText section="projects">
            Student at the University of Auckland
          </GlowText>
          <GlowText section="projects">
            Software Engineering Intern at Tidy International
          </GlowText>
        </div>
      </div>

      <Card hover rotate={10} href="https://github.com/ben-732" target="_blank">
        <AiFillGithub size="48" />
      </Card>
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
  return (
    <a href={`#${section}`}>
      <span className="hover:text-white text-slate-300 cursor-pointer">
        {children}
      </span>
    </a>
  );
}

export default App;
