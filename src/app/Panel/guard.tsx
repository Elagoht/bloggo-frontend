import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { postRefresh } from "../../services/session";
import { getUserSelf } from "../../services/users";
import { useAuthStore } from "../../stores/auth";
import { useProfileStore } from "../../stores/profile";
import { IconLoader } from "@tabler/icons-react";

const AuthGuardLayout: FC = () => {
  const navigate = useNavigate();
  const [isReady, setReady] = useState(false);
  const { setAuth, clearAuth } = useAuthStore();
  const { setProfile } = useProfileStore();

  useEffect(() => {
    const initAuth = async () => {
      const currentAuth = useAuthStore.getState();
      const currentProfile = useProfileStore.getState().profile;

      // Only refresh if we don't have an access token
      if (!currentAuth.accessToken) {
        const refreshResponse = await postRefresh();

        if (!refreshResponse.success) {
          clearAuth();
          navigate("/auth/login", { replace: true });
          return;
        }

        setAuth(refreshResponse.data);
      }

      // Only fetch profile if we don't have it cached
      if (!currentProfile) {
        const profileResponse = await getUserSelf();

        if (!profileResponse.success) {
          // If profile fetch fails, try refreshing tokens once
          const refreshResponse = await postRefresh();

          if (!refreshResponse.success) {
            clearAuth();
            navigate("/auth/login", { replace: true });
            return;
          }

          setAuth(refreshResponse.data);

          // Retry profile fetch with new token
          const retryProfileResponse = await getUserSelf();
          if (!retryProfileResponse.success) {
            clearAuth();
            navigate("/auth/login", { replace: true });
            return;
          }

          setProfile(retryProfileResponse.data);
        } else {
          setProfile(profileResponse.data);
        }
      }

      setReady(true);
    };

    initAuth();
  }, [navigate, setAuth, clearAuth, setProfile]);

  if (!isReady) {
    return (
      <main className="fixed grid place-items-center w-screen h-screen">
        <IconLoader className="size-16 animate-spin text-gopher-500" />
      </main>
    );
  }

  return <Outlet />;
};

export default AuthGuardLayout;
