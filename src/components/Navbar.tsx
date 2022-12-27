import { useRef, useEffect } from "react";
import Modal from "./Modal";
import MobileHamburger from "./MobileHamburger";

const Navbar = () => {
  const menuRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const currentModal = modalRef.current;
    if (currentModal) {
      currentModal.addEventListener("keydown", handleFocusLock);
    }

    return () => {
      if (currentModal) {
        currentModal.removeEventListener("keydown", handleFocusLock);
      }
    };
  }, [modalRef]);

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

  const handleFocusLock = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const focusableElements = modalRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusableElements) return;
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1] as HTMLElement;
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center h-20 px-4 border"
    >
      {/* Mobile menu */}
      <MobileHamburger />
      {/* Desktop links :md plus*/}
      <ul ref={menuRef} role="menu" className="hidden md:block">
        <li role="menuitem" tabIndex={0} aria-current={currentPath === "/"}>
          <a href="/2">Home</a>
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
