import { Component } from "solid-js";
import Input from "../components/form/Input";
import Button from "../components/form/button";
import ApiCall from "../utilities/apiCaller";
import { useNavigate } from "@solidjs/router";
import { $auth } from "../stores/auth";

const LoginForm: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get("email");
    const passphrase = formData.get("passphrase");

    const response = await ApiCall.post<ResponseAccessToken>("/auth/login", {
      email,
      passphrase,
    });

    if (!response.success) return; // TODO: Error handling

    $auth.set({
      accessToken: response.data.accessToken,
      name: "Furkan",
      role: "Admin",
      permissions: [],
    });

    navigate("/", { replace: true });
  };

  return (
    <form class="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input type="email" name="email" autofocus={true} placeholder="Email" />

      <Input type="password" name="passphrase" placeholder="Passphrase" />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
