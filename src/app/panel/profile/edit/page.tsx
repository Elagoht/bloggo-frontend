import { FC } from "react";
import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import Container from "../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import Button from "../../../../components/form/Button";
import UserProfileEditForm from "../../../../forms/UserProfileEditForm";
import { useProfileStore } from "../../../../stores/profile";

const EditProfilePage: FC = () => {
  const { profile } = useProfileStore();

  if (!profile) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gopher-600 mx-auto"></div>
            <p className="text-smoke-600 dark:text-smoke-400">
              Loading profile...
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container size="md">
      <div className="flex items-center gap-4 mb-6">
        <Button href="/profile" variant="outline" iconLeft={IconArrowLeft}>
          Back to Profile
        </Button>
      </div>

      <PageTitleWithIcon icon={IconUser}>Edit Profile</PageTitleWithIcon>

      <UserProfileEditForm profile={profile} />
    </Container>
  );
};

export default EditProfilePage;
