import { createSignal, onMount, ParentComponent, Show } from "solid-js";
import { useAuthGuard } from "../../guards/auth";
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";
import Footer from "../../components/layout/Footer";

const PanelLayout: ParentComponent = ({ children }) => {
  const [isReady, setReady] = createSignal(false);

  onMount(() => useAuthGuard(setReady));

  return (
    <Show when={isReady()}>
      <Header />
      <Aside />

      <main class="mt-16 flex col-span-2 p-4 flex-col gap-4 flex-1 max-w-full overflow-x-hidden">
        {children}
        <Footer />
      </main>
    </Show>
  );
};

export default PanelLayout;
