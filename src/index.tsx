import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./design/index.css";
import { routes } from "./routes";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />

      <Suspense fallback={<div>Loading...</div>}>
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
