import { IconTrash, IconUpload } from "@tabler/icons-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AvatarImage from "../../../../components/common/Avatar/AvatarImage";
import Button from "../../../../components/form/Button";
import ButtonGroup from "../../../../components/form/ButtonGroup";
import Form from "../../../../components/form/Form";
import Input from "../../../../components/form/Input";
import Container from "../../../../components/layout/Container";
import H1 from "../../../../components/typography/H1";
import {
  deleteUserAvatarSelf,
  getUserSelf,
  patchUserAvatarSelf,
} from "../../../../services/users";
import { useProfileStore } from "../../../../stores/profile";

const ProfileAvatarPage: FC = () => {
  const { profile, updateProfile } = useProfileStore();
  const [avatarImage, setAvatarImage] = useState<string>("");

  useEffect(() => {
    if (profile?.avatar) {
      setAvatarImage(profile.avatar);
    }
  }, [profile?.avatar]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const response = await patchUserAvatarSelf(data);

    if (response.success === true) {
      // Fetch the updated profile to get the new avatar URL from server
      const profileResponse = await getUserSelf();
      if (profileResponse.success) {
        updateProfile({ avatar: profileResponse.data.avatar });
        setAvatarImage(profileResponse.data.avatar || "");
      }
      toast.success("Avatar updated successfully!");
    } else {
      toast.error(response.error?.message || "Failed to update avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    const response = await deleteUserAvatarSelf();

    if (response.success === true) {
      // Update profile state and UI
      updateProfile({ avatar: undefined });
      setAvatarImage("");
      toast.success("Avatar deleted successfully!");
    } else {
      toast.error(response.error?.message || "Failed to delete avatar");
    }
  };

  return (
    <Container size="sm">
      <H1>Change Your Avatar</H1>

      <Form handle={handleSubmit}>
        <AvatarImage name={profile?.name || ""} avatar={avatarImage} />

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
    </Container>
  );
};

export default ProfileAvatarPage;
