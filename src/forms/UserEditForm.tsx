import React from "react";
import {
  IconUser,
  IconMail,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { patchUserUpdate } from "../services/users";

interface UserEditFormProps {
  user: ResponseUserDetails;
  onUpdate?: () => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onUpdate }) => {
  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    const response = await patchUserUpdate(user.id, {
      name,
      email,
    });

    if (response.success) {
      toast.success("User updated successfully!");
      onUpdate?.();
    } else {
      toast.error(response.error?.message || "Failed to update user");
    }
  };

  return (
    <PermissionGuard permission={["user:update"]}>
      <Form handle={handleSubmit}>
        <FormSection legend="User Information">
          <Input
            name="name"
            label="Full Name"
            iconLeft={IconUser}
            placeholder="e.g., John Doe"
            defaultValue={user.name}
            required
          />

          <Input
            name="email"
            label="Email Address"
            type="email"
            iconLeft={IconMail}
            placeholder="e.g., john@example.com"
            defaultValue={user.email}
            required
          />
        </FormSection>

        <ButtonGroup layout="flex-row" alignment="start" gap="md" fullWidth>
          <Button
            type="submit"
            color="success"
            className="flex-1"
            iconRight={IconDeviceFloppy}
          >
            Save Changes
          </Button>

          <Button
            color="danger"
            variant="outline"
            href="/users"
            iconLeft={IconX}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </PermissionGuard>
  );
};

export default UserEditForm;
