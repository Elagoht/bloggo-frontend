import { useNavigate } from "@solidjs/router";
import { onMount, ParentComponent, createSignal, Show } from "solid-js";
import { $auth } from "../../stores/auth";
import { useStore } from "@nanostores/solid";
import ApiCall from "../../utilities/apiCaller";

const AuthLayout: ParentComponent = ({ children }) => {
  const navigate = useNavigate();
  const auth = useStore($auth);
  const [isChecking, setChecking] = createSignal(true);

  onMount(async () => {
    if (auth().accessToken) {
      navigate("/", { replace: true });
      return;
    }

    const response = await ApiCall.post<ResponseAccessToken>("/auth/refresh");

    if (response.success) {
      $auth.set({
        accessToken: response.data.accessToken,
        name: "Furkan",
        role: "Admin",
        permissions: [],
      });

      navigate("/", { replace: true });
    } else {
      setChecking(false);
    }
  });

  return (
    <Show when={!isChecking()}>
      <main class="w-full bg-center bg-no-repeat bg-auth-day dark:bg-auth-night bg-cover grid place-items-center">
        <div class="flex flex-col gap-8 w-full max-w-96 bg-white dark:bg-black bg-opacity-35 dark:bg-opacity-35 backdrop-blur p-8 rounded-lg border-2 border-white dark:border-smoke-100 border-opacity-20 dark:border-opacity-10">
          {children}
        </div>
      </main>
    </Show>
  );
};

export default AuthLayout;
