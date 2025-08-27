import {
  IconCake,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconFileText,
  IconInfoCircle,
  IconKey,
  IconPercentage,
  IconSettings,
  IconShield,
  IconTrendingUp,
} from "@tabler/icons-react";
import { FC, useState } from "react";
import Avatar from "../../../components/common/Avatar";
import Button from "../../../components/form/Button";
import Container from "../../../components/layout/Container";
import InfoCard from "../../../components/layout/Container/InfoCard";
import SectionHeader from "../../../components/layout/SectionHeader";
import OwnedPermissionsTable from "../../../components/pages/panel/profile/OwnedPermissionsTable";
import { useAuthStore } from "../../../stores/auth";
import { useProfileStore } from "../../../stores/profile";
import classNames from "classnames";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";

const ProfilePage: FC = () => {
  const { permissions } = useAuthStore();
  const { profile } = useProfileStore();
  const [showPermissions, setShowPermissions] = useState(false);

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

  const data = [
    {
      title: "Written Posts",
      value: profile.writtenPostCount,
      icon: IconFileText,
      color: "gopher",
    },
    {
      title: "Published Posts",
      value: profile.publishedPostCount,
      icon: IconEye,
      color: "success",
    },
    {
      title: "Publish Ratio",
      value:
        profile.writtenPostCount > 0
          ? Math.round(profile.publishedPostCount / profile.writtenPostCount)
          : 0,
      icon: IconPercentage,
      color: "default",
      isRatio: true,
    },
    {
      title: "Member Since",
      value: new Date(profile.createdAt).toLocaleDateString(
        navigator.language,
        { day: "2-digit", month: "long", year: "numeric" }
      ),
      icon: IconCake,
    },
  ];

  return (
    <Container size="lg">
      {/* Profile Header */}
      <Avatar {...profile} />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 justify-center my-2">
        <Button href="/profile/edit" iconLeft={IconSettings}>
          Edit Profile
        </Button>

        <Button variant="outline" iconLeft={IconKey}>
          Change Password
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {data.map((datum) => (
          <dl
            key={datum.title}
            className={classNames(
              "bg-smoke-50 dark:bg-smoke-950 border border-smoke-100 dark:border-smoke-900 rounded-lg p-4 flex flex-col gap-4",
              {
                "text-gopher-500": datum.color === "gopher",
                "text-success-500": datum.color === "success",
              }
            )}
          >
            <dt className="flex flex-wrap items-center gap-2">
              <datum.icon size={20} className="shrink-0" />

              <small className="leading-snug font-medium">{datum.title}</small>
            </dt>

            <dd
              className={classNames("leading-4", {
                "text-gopher-600 dark:text-gopher-400":
                  datum.color === "gopher",
                "text-success-600 dark:text-success-400":
                  datum.color === "success",
              })}
            >
              {datum.isRatio ? (
                <div className="bg-smoke-100 dark:bg-smoke-1000 h-4 rounded-full overflow-clip relative">
                  <div
                    className="bg-success-500 top-0 left-0 bottom-0 absolute"
                    style={{ right: `${datum.value}%` }}
                  />
                </div>
              ) : (
                datum.value
              )}
            </dd>
          </dl>
        ))}
      </div>

      <InfoCard>
        <button
          onClick={() => setShowPermissions(!showPermissions)}
          className="flex items-center justify-between w-full"
        >
          <IconShield />
          Permissions & Access
          {showPermissions ? (
            <IconChevronUp className="text-smoke-600 dark:text-smoke-400" />
          ) : (
            <IconChevronDown className="text-smoke-600 dark:text-smoke-400" />
          )}
        </button>

        <div
          className={classNames("grid transition-all duration-500", {
            "grid-rows-[1fr]": showPermissions,
            "grid-rows-[0fr]": !showPermissions,
          })}
        >
          <div
            className={classNames(
              "overflow-hidden transition-all duration-500",
              { "mt-6": showPermissions, "opacity-0": !showPermissions }
            )}
          >
            <OwnedPermissionsTable permissions={permissions} />
          </div>
        </div>
      </InfoCard>
    </Container>
  );
};

export default ProfilePage;
