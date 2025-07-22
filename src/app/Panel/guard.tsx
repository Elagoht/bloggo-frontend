import { ParentComponent, createSignal, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { postRefresh } from "../../services/auth";
import { $auth } from "../../stores/auth";

const AuthGuardLayout: ParentComponent = (props) => {
  const navigate = useNavigate();
  const [isReady, setReady] = createSignal(false);

  onMount(async () => {
    const response = await postRefresh();

    if (!response.success) {
      $auth.set({
        accessToken: null,
        name: null,
        role: null,
        permissions: null,
      });
      navigate("/auth/login", { replace: true });
      return;
    }

    $auth.set(response.data);
    setReady(true);
  });

  return <Show when={isReady()}>{props.children}</Show>;
};

export default AuthGuardLayout;
