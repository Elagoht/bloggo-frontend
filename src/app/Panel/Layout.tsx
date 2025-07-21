import { ParentComponent } from "solid-js";
import Header from "../../components/layout/Header";

const Layout: ParentComponent = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default Layout;
