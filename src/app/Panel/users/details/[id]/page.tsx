import { IconInfoCircle, IconUser } from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivityDates from "../../../../../components/common/ActivityDates";
import UserStatsBar from "../../../../../components/common/UserStatsBar";
import UserViewCard from "../../../../../components/common/UserViewCard";
import PermissionGuard from "../../../../../components/Guards/PermissionGuard";
import RouteGuard from "../../../../../components/Guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import UserAvatarForm from "../../../../../forms/UserAvatarForm";
import UserChangePasswordForm from "../../../../../forms/UserChangePasswordForm";
import UserDeleteForm from "../../../../../forms/UserDeleteForm";
import UserEditForm from "../../../../../forms/UserEditForm";
import UserRoleAssignForm from "../../../../../forms/UserRoleAssignForm";
import { getUser } from "../../../../../services/users";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
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
    <RouteGuard permission={["user:view"]}>
      <ContentWithSidebar>
        <Container size="sm">
          <PageTitleWithIcon icon={IconUser}>User Details</PageTitleWithIcon>

          <UserAvatarForm user={user} onUpdate={fetchUser} />

          <UserStatsBar
            writtenPostCount={user.writtenPostCount}
            publishedPostCount={user.publishedPostCount}
          />

          <PermissionGuard
            permission={"user:update"}
            fallback={<UserViewCard user={user} />}
          >
            <UserEditForm user={user} onUpdate={fetchUser} />
          </PermissionGuard>

          <PermissionGuard permission={"user:assign_role"}>
            <UserRoleAssignForm user={user} onUpdate={fetchUser} />
          </PermissionGuard>
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconInfoCircle}>Details</SectionHeader>

          <ActivityDates
            dates={[
              { time: user.createdAt, title: "Created At" },
              { time: user.lastLogin || "Never", title: "Last Login" },
            ]}
          />

          <PermissionGuard permission="user:change_passphrase">
            <UserChangePasswordForm user={user} onUpdate={fetchUser} />
          </PermissionGuard>

          <PermissionGuard permission={"user:delete"}>
            <UserDeleteForm user={user} />
          </PermissionGuard>
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default UserEditPage;
