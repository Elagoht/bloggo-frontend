import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { postRefresh } from "../../services/session";
import { getUserSelf } from "../../services/users";
import { useAuthStore } from "../../stores/auth";
import { useProfileStore } from "../../stores/profile";

const AuthGuardLayout: FC = () => {
  const navigate = useNavigate();
  const [isReady, setReady] = useState(false);
  const { setAuth, clearAuth } = useAuthStore();
  const { setProfile } = useProfileStore();

  useEffect(() => {
    const initAuth = async () => {
      const refreshResponse = await postRefresh();

      if (!refreshResponse.success) {
        clearAuth();
        navigate("/auth/login", { replace: true });
        return;
      }

      setAuth(refreshResponse.data);

      const profileResponse = await getUserSelf();
      if (!profileResponse.success) {
        navigate("/auth/login", { replace: true });
        return;
      }

      setProfile(profileResponse.data);
      setReady(true);
    };

    initAuth();
  }, [navigate, setAuth, clearAuth, setProfile]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default AuthGuardLayout;
