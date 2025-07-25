import {
  ParentComponent,
  createSignal,
  onMount,
  Show,
  createResource,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { postRefresh } from "../../services/session";
import { $auth } from "../../stores/auth";
import { getUserSelf } from "../../services/users";
import { $profile } from "../../stores/profile";

const AuthGuardLayout: ParentComponent = (props) => {
  const navigate = useNavigate();
  const [isReady, setReady] = createSignal(false);

  onMount(async () => {
    const refreshResponse = await postRefresh();

    if (!refreshResponse.success) {
      $auth.set({
        accessToken: null,
        name: null,
        role: null,
        permissions: null,
      });
      navigate("/auth/login", { replace: true });
      return;
    }

    $auth.set(refreshResponse.data);

    const profileResponse = await getUserSelf();
    if (!profileResponse.success) throw navigate("/auth/login");

    $profile.set(profileResponse.data);

    setReady(true);
  });

  return <Show when={isReady()}>{props.children}</Show>;
};

export default AuthGuardLayout;
