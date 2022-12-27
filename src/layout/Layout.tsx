import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
