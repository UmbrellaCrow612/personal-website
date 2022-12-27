import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
  useRef,
} from "react";

interface Props {
  trigger: ReactElement;
  children: ReactNode;
}

const Modal = ({ trigger, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
      modalRef.current?.focus();
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
          className="fixed top-0 right-0 bottom-0 left-0 z-10 overflow-auto outline-none backdrop-blur"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
        >
          {children}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Modal;
