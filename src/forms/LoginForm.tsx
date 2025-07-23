import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import Input from "../components/form/Input";
import { postLogin } from "../services/auth";
import { $auth } from "../stores/auth";
import Button from "../components/form/Button";
import Form from "../components/form/Form";

const LoginForm: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    const email = data.get("email") as string;
    const passphrase = data.get("passphrase") as string;

    const response = await postLogin(email, passphrase);

    if (!response.success) return; // TODO: Error handling

    $auth.set(response.data);

    navigate("/", { replace: true });
  };

  return (
    <Form handle={handleSubmit}>
      <Input type="email" name="email" autofocus={true} placeholder="Email" />

      <Input type="password" name="passphrase" placeholder="Passphrase" />

      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
