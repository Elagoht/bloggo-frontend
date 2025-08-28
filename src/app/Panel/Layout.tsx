import { FC } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../../components/layout/Aside";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

const PanelLayout: FC = () => {
  return (
    <>
      <Header />

      <Aside />

      <main className="mt-16 md:ml-64 flex flex-col items-center p-4 gap-4 flex-1 max-w-full overflow-x-hidden">
        <Outlet />

        <Footer />
      </main>
    </>
  );
};

export default PanelLayout;
