import { FC } from "react";
import LoginForm from "../../../forms/LoginForm";
import H1 from "../../../components/typography/H1";

const LoginPage: FC = () => {
  return (
    <>
      <hgroup className="flex flex-col gap-2 items-center">
        <img
          src="/assets/bloggo.webp"
          width="128"
          height="128"
          alt="Bloggo Logo"
        />

        <H1>Bloggo</H1>

        <strong className="text-smoke-900 dark:text-gopher-200 font-medium">
          Your Own Blog CMS
        </strong>
      </hgroup>

      <LoginForm />
    </>
  );
};

export default LoginPage;
