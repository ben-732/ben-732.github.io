import { useEffect, useState } from "react";
import NavButton, { NavigateTo, sections } from "./NavButton";

function NavBar() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", updateNavbar);

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  const [activeSection, setActiveSection] = useState<sections>("home");

  const updateNavbar = () => {
    if (window !== undefined) {
      const windowPosition = window.scrollY;
      windowPosition > 250 ? setShowNav(true) : setShowNav(false);

      // Set active section based on scroll position
      const scrollPosition = windowPosition + window.innerHeight / 4;

      console.log(window.innerHeight, scrollPosition);

      if (scrollPosition < window.innerHeight) {
        setActiveSection("home");
      } else if (scrollPosition < window.innerHeight * 2) {
        setActiveSection("projects");
      } else if (scrollPosition < window.innerHeight * 3) {
        setActiveSection("skills");
      }
    }
  };

  // updateNavbar();

  return (
    <div
      className={`transition-all delay-150 fixed flex justify-start gap-4 px-4 h-12 items-center text-white ${
        showNav ? "mt-0" : "-mt-20"
      } bg-gray-900 z-10  w-full`}
    >
      {/* <span className=" text-lg font-medium">Ben McMurtrie</span> */}
      <NavButton section="home" activeSection={activeSection} />
      <NavButton section="about" activeSection={activeSection} />
      <NavButton section="projects" activeSection={activeSection} />
    </div>
  );
}

export default NavBar;
