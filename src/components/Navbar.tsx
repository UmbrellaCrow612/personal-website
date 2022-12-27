import React, { useRef, useEffect } from "react";

const Navbar = () => {
  const menuRef = useRef<HTMLUListElement>(null);
  const currentPath = window.location.pathname;

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
    <nav aria-label="Main navigation">
      <ul ref={menuRef} role="menu">
        <li role="menuitem" tabIndex={0} aria-current={currentPath === "/"}>
          <a>Home</a>
        </li>
        <li
          role="menuitem"
          tabIndex={0}
          aria-current={currentPath === "/about"}
        >
          <a href="/about">About</a>
        </li>
        <li
          role="menuitem"
          tabIndex={0}
          aria-current={currentPath === "/contact"}
        >
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
