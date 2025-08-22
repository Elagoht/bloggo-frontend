import React from "react";
import Avatar from "../../../components/common/Avatar";
import Container from "../../../components/layout/Container";
import OwnedPermissionsTable from "../../../components/pages/panel/profile/OwnedPermissionsTable";
import WrittenPostStats from "../../../components/pages/panel/profile/WrittenPostStats";
import { useAuthStore } from "../../../stores/auth";
import { useProfileStore } from "../../../stores/profile";

const ProfilePage: FC = () => {
  const { permissions } = useAuthStore();
  const { profile } = useProfileStore();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Avatar
        editAt="/profile/avatar"
        name={profile.name}
        email={profile.email}
        avatar={profile.avatar}
        roleName={profile.roleName}
        roleId={profile.roleId}
      />

      <WrittenPostStats
        publishedPostCount={profile.publishedPostCount}
        writtenPostCount={profile.writtenPostCount}
      />

      <OwnedPermissionsTable permissions={permissions} />
    </Container>
  );
};

export default ProfilePage;
