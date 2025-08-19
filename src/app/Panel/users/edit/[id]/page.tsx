import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { IconUser, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import ActivityDates from "../../../../../components/common/ActivityDates";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import RouteGuard from "../../../../../components/Guards/RouteGuard";
import UserEditForm from "../../../../../forms/UserEditForm";
import UserDeleteForm from "../../../../../forms/UserDeleteForm";
import UserRoleAssignForm from "../../../../../forms/UserRoleAssignForm";
import { getUser } from "../../../../../services/users";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ResponseUserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const result = await getUser(parseInt(id));

      if (!result.success) {
        navigate("/users");
        return;
      }

      setUser(result.data);
    } catch (error) {
      navigate("/users");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading || !user) {
    return null;
  }

  return (
    <RouteGuard permission={["user:view", "user:update"]}>
      <ContentWithSidebar>
        <Container size="sm">
          <PageTitleWithIcon icon={IconUser}>
            Edit User: {user.name}
          </PageTitleWithIcon>

          <FormCard color="default">
            <UserEditForm user={user} onUpdate={fetchUser} />
          </FormCard>

          <FormCard color="default">
            <SectionHeader icon={IconUser}>Role Assignment</SectionHeader>

            <UserRoleAssignForm user={user} onUpdate={fetchUser} />
          </FormCard>
        </Container>

        <Sidebar>
          <SectionHeader topMargin icon={IconInfoCircle}>
            Details
          </SectionHeader>

          <ActivityDates
            dates={[
              { time: user.createdAt, title: "Created At" },
              { time: user.lastLogin || "Never", title: "Last Login" },
            ]}
          />

          <FormCard color="danger">
            <SectionHeader icon={IconTrash} color="danger">
              Danger Zone
            </SectionHeader>

            <UserDeleteForm user={user} />
          </FormCard>
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default UserEditPage;
