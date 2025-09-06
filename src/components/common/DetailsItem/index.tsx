import { Icon, IconProps } from "@tabler/icons-react";
import {
  createElement,
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

type DetailsItemProps = {
  title: string;
  children: ReactNode;
} & (
  | {
      image?: never;
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    }
  | {
      image: string;
      // If image exists, icon will be used as a fallback value
      icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    }
);

const DetailsItem: FC<DetailsItemProps> = ({
  icon,
  image,
  title,
  children,
}) => {
  return (
    <section className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-smoke-950 border border-smoke-200 dark:border-smoke-700 rounded-lg">
      {icon ? (
        <span className="flex-shrink-0 p-1 bg-smoke-100 dark:bg-smoke-700 rounded">
          {createElement(icon, {
            className: "text-smoke-700 dark:text-smoke-300",
            size: 16,
          })}
        </span>
      ) : (
        <img src={image} alt="Details icon" className="size-5 rounded" />
      )}

      <dl className="flex flex-col flex-grow">
        <dt className="text-sm font-medium text-smoke-900 dark:text-smoke-50">
          {title}
        </dt>
        <dd className="text-xs text-smoke-600 dark:text-smoke-300 hover:text-smoke-800 dark:hover:text-smoke-100 transition-colors leading-none">
          {children}
        </dd>
      </dl>
    </section>
  );
};

export default DetailsItem;
