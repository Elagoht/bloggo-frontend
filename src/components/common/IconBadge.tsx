import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

type IconBadgeProps = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

const IconBadge: FC<IconBadgeProps> = ({ icon: Icon }) => {
  return (
    <figure className="p-2 bg-gopher-300 dark:bg-gopher-900 rounded-lg border border-gopher-400 dark:border-gopher-700">
      <Icon />
    </figure>
  );
};

export default IconBadge;
