import { IconExclamationCircle, IconKey, IconLock } from "@tabler/icons-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import { patchUserChangePassword } from "../services/users";

interface UserChangePasswordFormProps {
  user: UserDetails;
  onUpdate?: () => void;
}

const UserChangePasswordForm: FC<UserChangePasswordFormProps> = ({
  user,
  onUpdate,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormData) => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 12) {
      toast.error("Password must be at least 12 characters long!");
      return;
    }

    try {
      setLoading(true);
      const response = await patchUserChangePassword(user.id, {
        newPassword,
      });

      if (response.success === true) {
        toast.success("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
        onUpdate?.();
      } else {
        toast.error(response.error?.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard color="warning">
      <SectionHeader icon={IconKey} color="warning">
        Change Password
      </SectionHeader>

      <small className="text-warning-500 dark:text-warning-700 -my-2 text-center font-light flex items-center justify-center">
        <IconExclamationCircle className="inline-block size-4" /> You can change
        all users' passwords.
      </small>

      <Form handle={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={12}
          iconLeft={IconLock}
          placeholder="Enter new password (minimum 12 characters)"
        />

        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={12}
          iconLeft={IconLock}
          placeholder="Confirm new password"
        />

        <Button
          type="submit"
          color="warning"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </Form>
    </FormCard>
  );
};

export default UserChangePasswordForm;
