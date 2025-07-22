import { ParentComponent } from "solid-js";
import Aside from "../../components/layout/Aside";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

const PanelLayout: ParentComponent = ({ children }) => {
  return (
    <>
      <Header />
      <Aside />

      <main class="mt-16 flex col-span-2 p-4 flex-col gap-4 flex-1 max-w-full overflow-x-hidden">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default PanelLayout;
