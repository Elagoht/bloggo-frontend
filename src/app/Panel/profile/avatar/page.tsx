import { useStore } from "@nanostores/solid";
import { Component, createEffect, createSignal } from "solid-js";
import AvatarImage from "../../../../components/common/Avatar/AvatarImage";
import Form from "../../../../components/form/Form";
import Input from "../../../../components/form/Input";
import Container from "../../../../components/layout/Container";
import H1 from "../../../../components/typography/H1";
import { $profile } from "../../../../stores/profile";
import toast from "solid-toast";
import Button from "../../../../components/form/Button";
import { IconUpload } from "@tabler/icons-solidjs";
import { patchUserAvatarSelf } from "../../../../services/users";

const ProfileAvatarPage: Component = () => {
  const profile = useStore($profile);

  const [avatarImage, setAvatarImage] = createSignal<string>();

  createEffect(() => {
    if (avatarImage()) return;
    setAvatarImage(profile().avatar || "");
  });

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
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

  const handleSubmit = (data: FormData) => {
    patchUserAvatarSelf(data);
  };

  return (
    <Container size="sm">
      <H1>Change Your Avatar</H1>

      <Form handle={handleSubmit}>
        <AvatarImage name={profile().name} avatar={avatarImage()} />

        <Input
          type="file"
          name="avatar"
          accept="image/*"
          onchange={handleFileChange}
        />

        <Button type="submit">
          <IconUpload /> Update Avatar
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileAvatarPage;
