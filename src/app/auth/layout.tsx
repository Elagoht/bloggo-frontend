import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/auth";
import ApiCall from "../../utilities/apiCaller";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken, setAuth } = useAuthStore();
  const [isChecking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        navigate("/", { replace: true });
        return;
      }

      const response = await ApiCall.post<ResponseSession>("/auth/refresh");

      if (response.success) {
        setAuth(response.data);
        navigate("/", { replace: true });
      } else {
        setChecking(false);
      }
    };

    checkAuth();
  }, [accessToken, navigate, setAuth]);

  if (isChecking) {
    return null;
  }

  return (
    <main className="w-full bg-center bg-no-repeat bg-auth-day dark:bg-auth-night bg-cover grid place-items-center">
      <div className="flex flex-col gap-8 w-full max-w-96 bg-white dark:bg-black bg-opacity-35 dark:bg-opacity-35 backdrop-blur p-8 rounded-lg border-2 border-white dark:border-smoke-100 border-opacity-20 dark:border-opacity-10">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
