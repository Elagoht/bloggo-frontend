import {
  IconArticle,
  IconCategory,
  IconFileDescription,
  IconInfoCircle,
  IconTextCaption,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import FormCard from "../../layout/Container/FormCard";
import SectionHeader from "../../layout/SectionHeader";

type CategoryViewCardProps = {
  category: ResponseCategory;
};

const CategoryViewCard: FC<CategoryViewCardProps> = ({ category }) => {
  const data = [
    { icon: IconCategory, value: category.name },
    { icon: IconArticle, value: category.blogCount },
    { icon: IconFileDescription, value: category.spot, grow: true },
    { icon: IconTextCaption, value: category.description, grow: true },
  ];

  return (
    <FormCard>
      <SectionHeader icon={IconInfoCircle}>Category Info</SectionHeader>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {data.map((datum) => (
          <dl
            className={classNames(
              "flex items-center gap-2 p-2 bg-smoke-50 dark:bg-smoke-900 rounded-md border border-smoke-200 dark:border-smoke-700",
              { "col-span-2": datum.grow }
            )}
          >
            <dt className="text-smoke-700 dark:text-smoke-300">
              <datum.icon />
            </dt>

            <dd
              className={classNames(
                "text-smoke-900 dark:text-smoke-100 font-medium",
                { truncate: !datum.grow }
              )}
            >
              {datum.value}
            </dd>
          </dl>
        ))}
      </div>
    </FormCard>
  );
};

export default CategoryViewCard;
