import React from "react";
import {
  IconUser,
  IconMail,
  IconShield,
  IconInfoCircle,
} from "@tabler/icons-react";
import FormCard from "../../layout/Container/FormCard";
import SectionHeader from "../../layout/SectionHeader";

type UserViewCardProps = {
  user: ResponseUserDetails;
};

const UserViewCard: React.FC<UserViewCardProps> = ({ user }) => {
  const data = [
    { icon: IconUser, value: user.name },
    { icon: IconMail, value: user.email },
    { icon: IconShield, value: user.roleName },
  ];

  return (
    <FormCard>
      <SectionHeader icon={IconInfoCircle}>User Info</SectionHeader>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {data.map((datum) => (
          <dl className="flex items-center gap-2 p-2 bg-smoke-50 dark:bg-smoke-900 rounded-md border border-smoke-200 dark:border-smoke-700">
            <dt className="text-smoke-700 dark:text-smoke-300">
              <datum.icon />
            </dt>

            <dd className="text-smoke-900 dark:text-smoke-100 font-medium truncate">
              {datum.value}
            </dd>
          </dl>
        ))}
      </div>
    </FormCard>
  );
};

export default UserViewCard;
