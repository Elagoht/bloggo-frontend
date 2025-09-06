import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./design/index.css";
import { routes } from "./routes";
import { IconLoader } from "@tabler/icons-react";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />

      <Suspense
        fallback={
          <main className="fixed grid place-items-center w-screen h-screen">
            <IconLoader className="size-16 animate-spin text-gopher-500" />
          </main>
        }
      >
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </>
  );
};

const container = document.querySelector("body");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(<App />);
