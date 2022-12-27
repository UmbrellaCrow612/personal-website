import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
  useRef,
} from "react";

import { BiX } from "react-icons/bi";
interface Props {
  trigger: ReactElement;
  children: ReactNode;
  title: string;
}

const Modal = ({ trigger, children, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current?.setAttribute("aria-expanded", "true");
      focusTrapRef.current?.focus();
    } else {
      triggerRef.current?.setAttribute("aria-expanded", "false");
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick, ref: triggerRef })}
      {isOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-10 overflow-auto outline-none backdrop-blur"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
        >
          {/* Content goes */}
          <div className="h-full p-4 overflow-y-scroll" ref={focusTrapRef}>
            <div id="modal-title" className="mb-4 text-3xl font-bold">
              {title}
            </div>
            {children}
          </div>
          {/* Content goes */}

          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Space") {
                event.preventDefault();
                setIsOpen(!isOpen);
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setIsOpen(false);
              }
            }}
            className="absolute inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md top-4 right-4 hover:bg-gray-300"
          >
            <BiX className="text-2xl" />
            <span className="text-sm">Close</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
