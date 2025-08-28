import { IconTag, IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import Button from "../../../form/Button";
import PermissionGuard from "../../../Guards/PermissionGuard";

const NoTagsYet: FC = () => {
  return (
    <div className="bg-white dark:bg-smoke-950 rounded-lg border border-smoke-200 dark:border-smoke-800 p-8 text-center col-span-3">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-smoke-100 dark:bg-smoke-900 text-smoke-500 dark:text-smoke-400 rounded-full">
          <IconTag size={32} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-smoke-900 dark:text-smoke-100">
            No tags found
          </h3>

          <p className="text-smoke-600 dark:text-smoke-400 text-sm">
            <PermissionGuard
              permission="tag:create"
              fallback="Contact an editor or admin to create a tag."
            >
              Create a tag to organize your blog posts
            </PermissionGuard>
          </p>
        </div>

        <PermissionGuard permission="tag:create">
          <Button href="/tags/create" iconRight={IconPlus} color="success">
            Create Tag
          </Button>
        </PermissionGuard>
      </div>
    </div>
  );
};

export default NoTagsYet;
