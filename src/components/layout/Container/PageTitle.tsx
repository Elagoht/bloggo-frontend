import React from "react";
import H1 from "../../typography/H1";
import IconBadge from "../../common/IconBadge";
import { Icon, IconProps } from "@tabler/icons-react";

type PageTitleWithIconProps = {
  children: React.ReactNode;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

const PageTitleWithIcon: React.FC<PageTitleWithIconProps> = ({
  children,
  icon,
}) => {
  return (
    <hgroup className="flex items-center gap-2 mb-2">
      <IconBadge icon={icon} />

      <H1>{children}</H1>
    </hgroup>
  );
};

export default PageTitleWithIcon;
