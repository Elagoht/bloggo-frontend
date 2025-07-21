import { Component } from "solid-js";
import Input from "../../../components/form/Input";
import Button from "../../../components/form/button";

const LoginPage: Component = () => {
  return (
    <>
      <hgroup class="flex flex-col gap-2 items-center">
        <img
          src="/assets/bloggo.webp"
          width="128"
          height="128"
          alt="Bloggo Logo"
        />

        <h1 class="text-3xl font-bold text-smoke-950 dark:text-gopher-50">
          Bloggo
        </h1>

        <strong class="text-smoke-900 dark:text-gopher-200 font-medium">
          Your Own Blog CMS
        </strong>
      </hgroup>

      <form class="flex flex-col gap-4" autocomplete="off">
        <Input
          type="email"
          autofocus={true}
          autocomplete="off"
          placeholder="Email"
        />

        <Input type="password" autocomplete="off" placeholder="Password" />

        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default LoginPage;
