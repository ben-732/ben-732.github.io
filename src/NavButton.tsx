export type sections = "home" | "projects" | "skills";

export function NavigateTo(section: sections) {
  switch (section) {
    case "home":
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      break;
    case "projects":
      window.scroll({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
      break;
    case "skills":
      window.scroll({
        top: window.innerHeight * 2,
        left: 0,
        behavior: "smooth",
      });
      break;
  }
}

function NavButton({ section }: { section: sections }) {
  return (
    <span
      onClick={() => NavigateTo(section)}
      className="cursor-pointer hover:text-gray-50  text-gray-400"
    >
      {section[0].toUpperCase()}
      {section.substring(1).toLowerCase()}
    </span>
  );
}

export default NavButton;