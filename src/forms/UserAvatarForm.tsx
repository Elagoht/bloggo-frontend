import React, { useEffect, useState, useRef } from "react";
import {
  IconTrash,
  IconPencil,
  IconDeviceFloppy,
  IconX,
  IconEdit,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import AvatarImage from "../components/common/Avatar/AvatarImage";
import Form from "../components/form/Form";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { deleteUserAvatar, patchUserAvatar } from "../services/users";
import FormCard from "../components/layout/Container/FormCard";
import Button from "../components/form/Button";

interface UserAvatarFormProps {
  user: ResponseUserDetails;
  onUpdate?: () => void;
}

const UserAvatarForm: React.FC<UserAvatarFormProps> = ({ user, onUpdate }) => {
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Select an image file!");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarImage(reader.result as string);
      reader.onerror = () => toast.error("Couldn't read file");
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setAvatarImage(user?.avatar || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
    <Form handle={handleSubmit}>
      <div className="relative mx-auto">
        <AvatarImage name={user?.name || ""} avatar={avatarImage} />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Clear file button - top left when file is selected */}
        {selectedFile && (
          <Button
            onClick={handleClearFile}
            className="!rounded-full top-3.5 left-3.5 absolute !p-2"
            iconLeft={IconX}
            title="Clear selection"
          />
        )}

        {/* Edit/Save button - top right */}
        <PermissionGuard permission={"user:update"}>
          {selectedFile ? (
            <Button
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
        </PermissionGuard>

        {/* Delete button - bottom left when avatar exists */}
        {(user?.avatar || avatarImage) && (
          <PermissionGuard permission={"user:update"}>
            <Button
              onClick={handleDeleteAvatar}
              className="!rounded-full bottom-4 left-4 absolute !p-2"
              color="danger"
              title="Delete avatar"
            >
              <IconTrash size={16} />
            </Button>
          </PermissionGuard>
        )}
      </div>
    </Form>
  );
};

export default UserAvatarForm;
