import { Icon, IconProps } from "@tabler/icons-react";
import {
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";
import IconBadge from "../../common/IconBadge";
import H1 from "../../typography/H1";

type PageTitleWithIconProps = PropsWithChildren & {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

const PageTitleWithIcon: FC<PageTitleWithIconProps> = ({ children, icon }) => {
  return (
    <hgroup className="flex items-center gap-2 mb-2">
      <IconBadge icon={icon} />

      <H1>{children}</H1>
    </hgroup>
  );
};

export default PageTitleWithIcon;
