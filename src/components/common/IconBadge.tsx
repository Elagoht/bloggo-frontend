import { Icon, IconProps } from "@tabler/icons-react";
import React from "react";

type IconBadgeProps = {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

const IconBadge: React.FC<IconBadgeProps> = ({ icon: Icon }) => {
  return (
    <figure className="p-2 bg-gopher-300 dark:bg-gopher-900 rounded-lg border border-gopher-400 dark:border-gopher-700">
      <Icon />
    </figure>
  );
};

export default IconBadge;
