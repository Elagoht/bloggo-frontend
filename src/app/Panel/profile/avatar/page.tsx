import React, { useEffect, useState } from "react";
import AvatarImage from "../../../../components/common/Avatar/AvatarImage";
import Form from "../../../../components/form/Form";
import Input from "../../../../components/form/Input";
import Container from "../../../../components/layout/Container";
import H1 from "../../../../components/typography/H1";
import { useProfileStore } from "../../../../stores/profile";
import toast from "react-hot-toast";
import Button from "../../../../components/form/Button";
import { IconUpload } from "@tabler/icons-react";
import { patchUserAvatarSelf } from "../../../../services/users";

const ProfileAvatarPage: React.FC = () => {
  const { profile, updateProfile } = useProfileStore();
  const [avatarImage, setAvatarImage] = useState<string>("");

  useEffect(() => {
    if (profile?.avatar) {
      setAvatarImage(profile.avatar);
    }
  }, [profile?.avatar]);

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
    const response = await patchUserAvatarSelf(data);

    if (response.success === true) {
      updateProfile({ avatar: avatarImage });
      toast.success("Avatar updated successfully!");
    } else {
      toast.error(response.error?.message || "Failed to update avatar");
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

        <Button type="submit">
          <IconUpload /> Update Avatar
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileAvatarPage;
