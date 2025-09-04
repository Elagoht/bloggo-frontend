import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUsers,
  IconDeviceFloppy,
  IconUser,
  IconMail,
  IconKey,
  IconShield,
  IconX,
} from "@tabler/icons-react";
import Button from "../../../../components/form/Button";
import ButtonGroup from "../../../../components/form/ButtonGroup";
import Form from "../../../../components/form/Form";
import FormSection from "../../../../components/form/FormSection";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import Container from "../../../../components/layout/Container";
import FormCard from "../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import { postUserCreate } from "../../../../services/users";
import { getRoles } from "../../../../services/roles";
import RouteGuard from "../../../../components/Guards/RouteGuard";
import toast from "react-hot-toast";

const UserCreatePage: FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      const response = await getRoles();
      if (response.success) {
        setRoles(response.data);
      }
    };
    loadRoles();
  }, []);

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const passphrase = data.get("passphrase") as string;
    const roleId = parseInt(data.get("roleId") as string);

    const userData: RequestUserCreate = {
      name,
      email,
      passphrase,
      roleId,
    };

    const response = await postUserCreate(userData);

    if (!response.success) {
      toast.error(response.error?.message || "Failed to create user");
      return;
    }

    toast.success("User created successfully!");
    navigate("/users");
  };

  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
  }));

  return (
    <RouteGuard permission="user:register" redirectTo="/users">
      <Container size="sm">
        <PageTitleWithIcon icon={IconUsers}>Create User</PageTitleWithIcon>

        <FormCard color="default">
          <Form handle={handleSubmit}>
            <FormSection legend="User Information">
              <Input
                autoFocus
                name="name"
                label="Full Name"
                iconLeft={IconUser}
                placeholder="e.g., John Doe"
                required
                minLength={3}
                maxLength={100}
              />

              <Input
                name="email"
                type="email"
                label="Email Address"
                iconLeft={IconMail}
                placeholder="e.g., john.doe@example.com"
                required
                minLength={5}
                maxLength={255}
              />

              <Input
                name="passphrase"
                type="password"
                label="Password"
                iconLeft={IconKey}
                placeholder="Enter a secure password"
                required
                minLength={12}
                maxLength={100}
              />
            </FormSection>

            <FormSection legend="Role Assignment">
              <Select
                name="roleId"
                label="User Role"
                icon={IconShield}
                options={roleOptions}
                required
              />
            </FormSection>

            <ButtonGroup>
              <Button
                type="submit"
                color="success"
                className="flex-1"
                shortcutKey="Enter"
                iconRight={IconDeviceFloppy}
              >
                Create User
              </Button>

              <Button
                color="danger"
                variant="outline"
                href="/users"
                shortcutKey="Escape"
                iconLeft={IconX}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Container>
    </RouteGuard>
  );
};

export default UserCreatePage;
