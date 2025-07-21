import { ParentComponent } from "solid-js";

const AuthLayout: ParentComponent = ({ children }) => {
  return (
    <main class="w-full bg-center bg-no-repeat bg-auth-day dark:bg-auth-night bg-cover grid place-items-center">
      <div class="flex flex-col gap-8 w-full max-w-96 bg-white dark:bg-black bg-opacity-35 dark:bg-opacity-35 backdrop-blur p-8 rounded-lg border-2 border-white dark:border-smoke-100 border-opacity-20 dark:border-opacity-10">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
