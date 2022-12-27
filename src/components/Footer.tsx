import { useRef, useEffect } from "react";

const Footer = () => {
  const menuRef = useRef<HTMLUListElement>(null);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    const currentMenu = menuRef.current;
    if (currentMenu) {
      currentMenu.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (currentMenu) {
        currentMenu.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [menuRef]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();

      const menuItems = menuRef.current?.querySelectorAll("[role=menuitem]");
      if (!menuItems) return;

      const currentIndex = Array.from(menuItems).findIndex(
        (menuItem) => menuItem === document.activeElement
      );
      let nextIndex: number;
      if (event.key === "ArrowUp") {
        nextIndex =
          currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
      } else {
        nextIndex =
          currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1;
      }
      (menuItems[nextIndex] as HTMLLIElement).focus();
    }
  };

  return (
    <footer aria-label="Footer navigation">
      <ul ref={menuRef} role="menu">
        <li
          role="menuitem"
          tabIndex={0}
          aria-current={currentPath === "/privacy"}
        >
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li
          role="menuitem"
          tabIndex={0}
          aria-current={currentPath === "/terms"}
        >
          <a href="/terms">Terms of Use</a>
        </li>
        <li
          role="menuitem"
          tabIndex={0}
          aria-current={currentPath === "/contact"}
        >
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
