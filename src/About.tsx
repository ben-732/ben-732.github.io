import React from "react";

const sections = [
  {
    title: "University of Auckland",
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
    body: <>I attended Mahurangi College from 2015 - 2021</>,
  },
];

function About() {
  return (
    <div className=" h-screen mt-screen  bg-gradient-to-b from-[#010105] bg-[#2d0d45] flex flex-col items-center  ">
      <div className=" h-full flex-col flex pt-20 mx-2 sm:mx-0 md:w-4/5 items-center lg:items-start">
        <span className="text-white text-3xl lg:ml-4 mt-2 font-extralight mb-4 block">
          About Me
        </span>
        <div className="flex">
          {sections.map((s, i) => (
            <div
              className="text-black lg:ml-4 mt-2 w-96 bg-white p-4 rounded-md"
              key={i}
            >
              <span className="text-lg font-medium block">{s.title}</span>
              {s.body}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
