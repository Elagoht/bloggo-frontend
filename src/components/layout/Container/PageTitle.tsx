import { Component, ParentComponent } from "solid-js";
import H1 from "../../typography/H1";
import IconBadge from "../../common/IconBadge";

type PageTitleWithIconProps = ParentComponent<{
  icon: Component;
}>;

const PageTitleWithIcon: PageTitleWithIconProps = ({ children, icon }) => {
  return (
    <hgroup class="flex items-center gap-2 mb-2">
      <IconBadge icon={icon} />

      <H1>{children}</H1>
    </hgroup>
  );
};

export default PageTitleWithIcon;
