import Modal from "./Modal";
import { BiMenu } from "react-icons/bi";

const MobileHamburger = () => {
  return (
    <>
      <Modal
        trigger={
          <button aria-label="Toggle menu" tabIndex={0}>
            <BiMenu className="text-3xl" />
          </button>
        }
      >
        content
      </Modal>
    </>
  );
};

export default MobileHamburger;
