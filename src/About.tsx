import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { IoSchool } from "react-icons/io5";
import { RiToolsFill } from "react-icons/ri";

const educationType = {
  name: "Education",
  icon: <IoSchool />,
};

const workType = {
  name: "Work Experience",
  icon: <RiToolsFill />,
};

const sections = [
  {
    title: "Technical Assistant / Lighting Designer",
    type: workType,
    date: "2023",

    body: (
      <>
        <div className="mb-2">
          I worked as a Technical Assistant for a production of Freaky Friday at
          the Mahurangi College auditorium.
        </div>
        <ul className="list-disc mt-2">
          <li className="ml-6">
            Supporting front of house technicians as required.
          </li>
          <li className="ml-6">
            Trouble shooting problems before and during shows and working to
            solve them as quickly as possible.
          </li>
          <li className="ml-6">
            Designed and built a lighting system for a prop that interfaced with
            a theatre show control system.
          </li>
          <li className="ml-6">
            Mentored two junior technicians to achieve a level of proficiency
            with our lighting control system.
          </li>
          <li className="ml-6">
            Design a lighting plan that utilized both fixtures owned by the
            venue and a budget for hire lights.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "University of Auckland",
    type: educationType,
    date: "2022 - 2025",
    body: (
      <>
        I'm a Part 2 Software Engineering student at the university of Auckland.
        <ul className="list-disc mt-2">
          <li className="ml-6">Deans honours list 2022</li>
          <li className="ml-6">8.0+ GPA</li>
          <li className="ml-6">
            <a
              className="text-primary transition duration-150 ease-in-out underline text-blue-600"
              href="https://www.auckland.ac.nz/en/engineering/current-students/student-support/part-i-assistance-centre.html"
            >
              P1AC
            </a>{" "}
            Mentor Sem 2 2023
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Mahurangi College",
    date: "2015 - 2021",

    type: educationType,

    body: (
      <>
        I attended Mahurangi College from 2015 - 2021
        <ul className="list-disc mt-2">
          <li className="ml-6">School Prefect 2021</li>
          <li className="ml-6">NCEA Level 3 Endorsed Excellence</li>
          <li className="ml-6">NCEA Level 2 Endorsed Excellence</li>
        </ul>
      </>
    ),
  },
];

function About() {
  // State to store the index of the "active section"
  const [activeSection, setSection] = useState(-1);

  // Boolean to check if is mobile mode - collapses sections
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Function to update isMobile state thing
  function updateWidth() {
    // Get screen width
    const width = window.innerWidth;
    setMobile(width < 1024);
  }

  return (
    <div className=" h-screen mt-screen  bg-gradient-to-b from-[#010105] bg-[#2d0d45] flex flex-col items-center  ">
      <div className=" h-full flex-col flex pt-20 mx-2 sm:mx-0 md:w-4/5 items-center lg:items-start">
        <span className="text-white text-3xl lg:ml-4 mt-2 font-extralight mb-4 block">
          About Me
        </span>
        <div className="flex items-start flex-wrap w-full justify-center lg:justify-start">
          {sections.map((s, i) => (
            <div
              className="text-black md:ml-4 mt-2 lg:w-96 w-4/5 bg-gray-300 p-4 rounded-md transition-all"
              key={i}
              onClick={() => setSection(activeSection === i ? -1 : i)}
            >
              <div className="flex -mt-2 items-center text-gray-600">
                <span className="mr-2"> {s.type?.icon}</span>
                <span className="">{s.type?.name}</span>
                <span className="flex-grow" />
                <span className="text-xs">{s.date}</span>
              </div>
              <div className="flex flex-row">
                <span className="text-xl font-medium text-blue-700 mb-1">
                  {s.title}
                </span>
                <div className="flex-grow" />
                {isMobile && (
                  <button>
                    <AiOutlineRight
                      className={`transition-transform ${
                        activeSection === i && "rotate-90"
                      }`}
                    />
                  </button>
                )}
              </div>
              {(!isMobile || activeSection === i) && s.body}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
