import {
  IconCamera,
  IconDeviceFloppy,
  IconKey,
  IconLock,
  IconMail,
  IconPencil,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { ChangeEvent, FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import AvatarImage from "../components/common/Avatar/AvatarImage";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import {
  deleteUserAvatarSelf,
  patchUserAvatarSelf,
  patchUserChangePassword,
} from "../services/users";
import { useProfileStore } from "../stores/profile";

type UserProfileEditFormProps = {
  profile: UserDetails;
};

const UserProfileEditForm: FC<UserProfileEditFormProps> = ({ profile }) => {
  const { updateProfile } = useProfileStore();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Avatar file size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await patchUserAvatarSelf(formData);
      if (response.success) {
        toast.success("Avatar updated successfully!");
        // Update profile store with new avatar URL from backend
        updateProfile({ avatar: response.data.avatar });
        setAvatarFile(null);
        setAvatarPreview(null);
      } else {
        toast.error(response.error?.message || "Failed to update avatar");
      }
    } catch {
      toast.error("Failed to update avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleAvatarDelete = async () => {
    setIsDeletingAvatar(true);
    try {
      const response = await deleteUserAvatarSelf();
      if (response.success) {
        toast.success("Avatar removed successfully!");
        updateProfile({ avatar: undefined });
      } else {
        toast.error(response.error?.message || "Failed to remove avatar");
      }
    } catch {
      toast.error("Failed to remove avatar");
    } finally {
      setIsDeletingAvatar(false);
    }
  };

  const handlePasswordChange = async (data: FormData) => {
    const newPassword = data.get("newPassword") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await patchUserChangePassword(profile.id, {
        newPassword,
      });

      if (response.success) {
        toast.success("Password changed successfully!");
        setShowPasswordForm(false);
      } else {
        toast.error(response.error?.message || "Failed to change password");
      }
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <FormCard>
        <SectionHeader icon={IconCamera}>Profile Picture</SectionHeader>

        <div className="flex justify-center">
          <div className="relative mx-auto">
            <AvatarImage
              name={profile.name}
              avatar={avatarPreview || profile.avatar}
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            {/* Clear file button - top left when file is selected */}
            {avatarFile && (
              <Button
                onClick={handleClearFile}
                className="!rounded-full top-3.5 left-3.5 absolute !p-2"
                iconLeft={IconX}
                title="Clear selection"
              />
            )}

            {/* Edit/Save button - top right */}
            {avatarFile ? (
              <Button
                onClick={handleAvatarUpload}
                disabled={isUploadingAvatar}
                className="!rounded-full top-3.5 right-3.5 absolute !p-2"
                color="success"
                title="Save avatar"
                iconLeft={IconDeviceFloppy}
              />
            ) : (
              <Button
                onClick={handleEditClick}
                className="!rounded-full top-3.5 right-3.5 absolute !p-2"
                title="Edit avatar"
                iconLeft={IconPencil}
              />
            )}

            {/* Delete button - bottom left when avatar exists */}
            {profile.avatar && !avatarFile && (
              <Button
                onClick={handleAvatarDelete}
                disabled={isDeletingAvatar}
                className="!rounded-full bottom-4 left-4 absolute !p-2"
                color="danger"
                title="Delete avatar"
              >
                <IconTrash size={16} />
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm text-smoke-600 dark:text-smoke-400 text-center mt-4">
          JPG, PNG, WEBP or GIF. Max file size 5MB.
        </p>
      </FormCard>

      {/* Basic Information */}
      <FormCard>
        <SectionHeader icon={IconUser}>Basic Information</SectionHeader>

        <div className="space-y-4">
          <div>
            <small className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2">
              Full Name
            </small>

            <Input
              autoFocus
              name="name"
              iconLeft={IconUser}
              defaultValue={profile.name}
              placeholder="Enter your full name"
              disabled
            />
            <p className="text-xs text-smoke-500 dark:text-smoke-400 mt-1">
              Contact an administrator to change your name
            </p>
          </div>

          <div>
            <small className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2">
              Email Address
            </small>
            <Input
              name="email"
              type="email"
              iconLeft={IconMail}
              defaultValue={profile.email}
              placeholder="Enter your email address"
              disabled
            />
            <p className="text-xs text-smoke-500 dark:text-smoke-400 mt-1">
              Contact an administrator to change your email
            </p>
          </div>
        </div>
      </FormCard>

      {/* Password Change Section */}
      <FormCard>
        <div className="flex items-center justify-between">
          <SectionHeader icon={IconKey}>Change Password</SectionHeader>
          <Button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            variant="outline"
            iconLeft={showPasswordForm ? IconLock : IconKey}
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </Button>
        </div>

        {showPasswordForm && (
          <Form handle={handlePasswordChange}>
            <Input
              name="currentPassword"
              type="password"
              label="Current Password"
              iconLeft={IconLock}
              placeholder="Enter your current password"
              required
            />

            <Input
              name="newPassword"
              type="password"
              label="New Password"
              iconLeft={IconKey}
              placeholder="Enter your new password"
              minLength={8}
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              iconLeft={IconKey}
              placeholder="Confirm your new password"
              minLength={8}
              required
            />

            <Button type="submit" color="success" iconRight={IconDeviceFloppy}>
              Update Password
            </Button>
          </Form>
        )}
      </FormCard>
    </div>
  );
};

export default UserProfileEditForm;
