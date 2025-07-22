import { Component } from "solid-js";
import { $auth } from "../../../stores/auth";
import { useStore } from "@nanostores/solid";
import OwnedPermissionsTable from "../../../components/pages/panel/profile/OwnedPermissionsTable";
import Container from "../../../components/layout/Container";

const ProfilePage: Component<{}> = (props) => {
  const auth = useStore($auth);

  return (
    <Container>
      <OwnedPermissionsTable permissions={auth().permissions} />
    </Container>
  );
};

export default ProfilePage;
