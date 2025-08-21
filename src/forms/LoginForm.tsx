import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/Input";
import { postLogin } from "../services/session";
import { useAuthStore } from "../stores/auth";
import Button from "../components/form/Button";
import Form from "../components/form/Form";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (data: FormData) => {
    const email = data.get("email") as string;
    const passphrase = data.get("passphrase") as string;

    const response = await postLogin(email, passphrase);

    if (!response.success) return; // TODO: Error handling

    setAuth(response.data);

    navigate("/", { replace: true });
  };

  return (
    <Form handle={handleSubmit}>
      <Input type="email" name="email" autoFocus={true} placeholder="Email" />

      <Input type="password" name="passphrase" placeholder="Passphrase" />

      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
