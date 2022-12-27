import Modal from "./Modal";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";

interface Page {
  id: number;
  href: string;
  title: string;
}

interface Props {
  pages: Page[];
}

const MobileHamburger = () => {
  const pages: Page[] = [
    {
      id: 1,
      href: "/about",
      title: "About",
    },
    {
      id: 2,
      href: "/blog",
      title: "Blog",
    },
    {
      id: 3,
      href: "/contact",
      title: "Contact",
    },
  ];
  return (
    <div className="md:hidden">
      <Modal
        trigger={
          <button aria-label="Toggle menu" tabIndex={0}>
            <BiMenu className="text-3xl" />
          </button>
        }
        title="Navigation"
      >
        {/* Content inside off it */}
        <div className="flex flex-col w-full h-full gap-4">
          <PageLinks pages={pages} />
        </div>
      </Modal>
    </div>
  );
};

export default MobileHamburger;

const PageLinks: React.FC<Props> = (props) => {
  const { pages } = props;

  return (
    <>
      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.href}
          className="px-4 py-2 font-semibold text-blue-700 border border-blue-500 rounded pbg-transparent hover:bg-blue-500 hover:text-white hover:border-transparent"
          aria-label={page.title}
        >
          {page.title}
        </Link>
      ))}
    </>
  );
};
