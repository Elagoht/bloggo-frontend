import {
  IconChevronDown,
  IconExclamationCircle,
  IconKey,
  IconLock,
} from "@tabler/icons-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import { patchUserChangePassword } from "../services/users";
import classNames from "classnames";

type UserChangePasswordFormProps = {
  user: UserDetails;
  onUpdate?: () => void;
};

const UserChangePasswordForm: FC<UserChangePasswordFormProps> = ({
  user,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (event: FormData) => {
    const newPassword = event.get("newPassword") as string;
    const confirmPassword = event.get("confirmPassword") as string;

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
        onUpdate?.();
      } else {
        toast.error(response.error?.message || "Failed to update password");
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard color="warning">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none"
      >
        <SectionHeader icon={IconKey} color="warning">
          Change Password
        </SectionHeader>
      </button>

      <div
        className={classNames("grid transition-all duration-300 ease-in-out", {
          "grid-rows-[1fr]": isExpanded,
          "grid-rows-[0fr] -mt-3": !isExpanded,
        })}
      >
        <div className="overflow-hidden">
          <small className="text-warning-500 dark:text-warning-700 text-center font-light flex items-center justify-center">
            <IconExclamationCircle className="inline-block size-4" /> You can
            change all users' passwords.
          </small>

          <Form className="flex flex-col gap-4" handle={handleSubmit}>
            <Input
              name="newPassword"
              label="New Password"
              type="password"
              required
              minLength={12}
              iconLeft={IconLock}
              placeholder="Enter new password (minimum 12 characters)"
              disabled={!isExpanded}
            />

            <Input
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              required
              minLength={12}
              iconLeft={IconLock}
              placeholder="Confirm new password"
              disabled={!isExpanded}
            />

            <Button
              type="submit"
              color="warning"
              disabled={loading || !isExpanded}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </div>
      </div>
    </FormCard>
  );
};

export default UserChangePasswordForm;
