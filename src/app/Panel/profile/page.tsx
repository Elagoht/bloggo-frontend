import { useStore } from "@nanostores/solid";
import { Component } from "solid-js";
import Avatar from "../../../components/common/Avatar";
import Container from "../../../components/layout/Container";
import OwnedPermissionsTable from "../../../components/pages/panel/profile/OwnedPermissionsTable";
import WrittenPostStats from "../../../components/pages/panel/profile/WrittenPostStats";
import { $auth } from "../../../stores/auth";
import { $profile } from "../../../stores/profile";

const ProfilePage: Component = () => {
  const auth = useStore($auth);
  const profile = useStore($profile);

  return (
    <Container>
      <Avatar
        editAt="/profile/avatar"
        name={profile().name}
        email={profile().email}
        avatar={profile().avatar}
        roleName={profile().roleName}
        roleId={profile().roleId}
      />

      <WrittenPostStats
        publishedPostCount={profile().publishedPostCount}
        writtenPostCount={profile().writtenPostCount}
      />

      <OwnedPermissionsTable permissions={auth().permissions} />
    </Container>
  );
};

export default ProfilePage;
