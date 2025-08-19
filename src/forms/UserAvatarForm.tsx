import React, { useEffect, useState } from "react";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import toast from "react-hot-toast";
import AvatarImage from "../components/common/Avatar/AvatarImage";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { deleteUserAvatar, patchUserAvatar } from "../services/users";
import FormCard from "../components/layout/Container/FormCard";
import ButtonGroup from "../components/form/ButtonGroup";

interface UserAvatarFormProps {
  user: ResponseUserDetails;
  onUpdate?: () => void;
}

const UserAvatarForm: React.FC<UserAvatarFormProps> = ({ user, onUpdate }) => {
  const [avatarImage, setAvatarImage] = useState<string>("");

  useEffect(() => {
    if (user?.avatar) {
      setAvatarImage(user.avatar);
    }
  }, [user?.avatar]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Couldn't be more than 5 MB.");
        return setAvatarImage("");
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Select an image file!");
        return setAvatarImage("");
      }

      const reader = new FileReader();
      reader.onload = () => setAvatarImage(reader.result as string);
      reader.onerror = () => toast.error("Couldn't read file");
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const response = await patchUserAvatar(user.id, data);

    if (response.success === true) {
      toast.success("Avatar updated successfully!");
      onUpdate?.();
    } else {
      toast.error(response.error?.message || "Failed to update avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    const response = await deleteUserAvatar(user.id);

    if (response.success === true) {
      toast.success("Avatar deleted successfully!");
    } else {
      toast.error(response.error?.message || "Failed to delete avatar");
    }
  };

  return (
    <FormCard>
      <Form handle={handleSubmit}>
        <AvatarImage name={user?.name || ""} avatar={avatarImage} />

        <Input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />

        <ButtonGroup>
          <Button iconRight={IconUpload} type="submit" className="flex-1">
            Update Avatar
          </Button>

          {avatarImage && (
            <Button
              iconLeft={IconTrash}
              color="danger"
              variant="outline"
              onClick={handleDeleteAvatar}
              type="button"
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Form>
    </FormCard>
  );
};

export default UserAvatarForm;
