export type sections = "home" | "projects" | "skills" | "about";

export function NavigateTo(section: sections) {
  switch (section) {
    case "home":
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      break;
    case "about":
      window.scroll({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
      break;
    case "projects":
      window.scroll({
        top: window.innerHeight * 2,
        left: 0,
        behavior: "smooth",
      });
      break;
  }
}

function NavButton({
  section,
  activeSection,
}: {
  section: sections;
  activeSection: sections;
}) {
  return (
    <span
      id={section}
      onClick={() => NavigateTo(section)}
      className={`cursor-pointer hover:text-gray-50  text-gray-400 text-lg hover:underline ${
        activeSection === section ? "text-gray-50" : ""
      }`}
    >
      {section === "home" && "Ben McMurtrie"}
      {section === "about" && "About Me"}
      {section !== "home" &&
        section !== "about" &&
        section[0].toUpperCase() + section.substring(1).toLowerCase()}
    </span>
  );
}

export default NavButton;
