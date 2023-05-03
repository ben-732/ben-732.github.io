import { useEffect, useState } from "react";
import NavButton, { NavigateTo } from "./NavButton";

function NavBar() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 250 ? setShowNav(true) : setShowNav(false);
    }
  };

  return (
    <div
      className={`transition-all delay-150 fixed flex justify-start gap-4 px-4 h-10 items-center text-white ${
        showNav ? "mt-0" : "-mt-20"
      } bg-gray-900 z-10  w-full`}
    >
      <span className="text-md font-medium">Ben McMurtrie</span>
      <NavButton section="home" />
      <NavButton section="projects" />
      <NavButton section="skills" />
    </div>
  );
}

export default NavBar;
