import React from "react";
import {
  IconUser,
  IconMail,
  IconDeviceFloppy,
  IconX,
  IconKey,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { patchUserUpdate } from "../services/users";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";

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
    <FormCard>
      <SectionHeader icon={IconUser}>User Info</SectionHeader>

      <Form handle={handleSubmit}>
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

        <Button type="submit" color="success" iconRight={IconDeviceFloppy}>
          Save Changes
        </Button>
      </Form>
    </FormCard>
  );
};

export default UserEditForm;
