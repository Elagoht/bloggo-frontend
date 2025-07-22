import { useNavigate } from "@solidjs/router";
import { onMount, ParentComponent } from "solid-js";
import { auth } from "../../stores/auth";

const AuthLayout: ParentComponent = ({ children }) => {
  const navigate = useNavigate();

  onMount(() => {
    if (!auth.accessToken) return;
    navigate("/", { replace: true });
  });

  return (
    <main class="w-full bg-center bg-no-repeat bg-auth-day dark:bg-auth-night bg-cover grid place-items-center">
      <div class="flex flex-col gap-8 w-full max-w-96 bg-white dark:bg-black bg-opacity-35 dark:bg-opacity-35 backdrop-blur p-8 rounded-lg border-2 border-white dark:border-smoke-100 border-opacity-20 dark:border-opacity-10">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
