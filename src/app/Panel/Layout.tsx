import { ParentComponent } from "solid-js";
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";
import Footer from "../../components/Footer";

const Layout: ParentComponent = ({ children }) => {
  return (
    <>
      <Header />

      <Aside />

      <main class="flex col-span-2 p-4 flex-col gap-4 flex-1 max-w-full overflow-x-hidden">
        {children}

        <Footer />
      </main>
    </>
  );
};

export default Layout;
