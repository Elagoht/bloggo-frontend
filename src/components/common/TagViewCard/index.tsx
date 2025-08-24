import { IconArticle, IconInfoCircle, IconTag } from "@tabler/icons-react";
import { FC } from "react";
import FormCard from "../../layout/Container/FormCard";
import SectionHeader from "../../layout/SectionHeader";

type TagViewCardProps = {
  tag: ResponseTag;
};

const TagViewCard: FC<TagViewCardProps> = ({ tag }) => {
  const data = [
    { icon: IconTag, value: tag.name },
    { icon: IconArticle, value: tag.blogCount },
  ];

  return (
    <FormCard>
      <SectionHeader icon={IconInfoCircle}>Tag Info</SectionHeader>

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

export default TagViewCard;
