import {
  IconCopy,
  IconEdit,
  IconEye,
  IconTag,
  IconVersions,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PostStatus } from "../../../../utilities/PostStatusUtils";
import { useProfileStore } from "../../../../stores/profile";
import Button from "../../../form/Button";
import PermissionGuard from "../../../Guards/PermissionGuard";

interface PostVersionCardProps {
  version: PostVersionCard;
  postId: number;
  isPublished: boolean;
}

const PostVersionCard: FC<PostVersionCardProps> = ({
  version,
  postId,
  isPublished,
}) => {
  const { profile } = useProfileStore();
  const isDraft = version.status === 0;
  const canEdit = isDraft && profile?.id === version.versionAuthor.id;

  const data = [
    {
      icon: (
        <img
          width={20}
          height={20}
          className="rounded-full"
          src={import.meta.env.VITE_API_URL + version.versionAuthor.avatar}
        />
      ),
      title: "Author",
      href: `/users/details/${version.versionAuthor.id}`,
      value: version.versionAuthor.name,
    },
    ...(version.category?.name
      ? [
          {
            icon: <IconTag size={20} />,
            title: "Category",
            href: `/categories/details/${version.category.slug}`,
            value: version.category.name,
          },
        ]
      : []),
  ];

  return (
    <div
      className={classNames(
        "bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-3 gap-2 flex flex-col transition-all duration-200",
        {
          "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/30":
            isPublished,
          "hover:border-gopher-300 dark:hover:border-gopher-700": !isPublished,
        }
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={classNames(
            "p-2 rounded-lg transition-colors flex-shrink-0",
            {
              "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400":
                isPublished,
              "bg-gopher-100 dark:bg-gopher-900 text-gopher-600 dark:text-gopher-400":
                !isPublished,
            }
          )}
        >
          <IconVersions size={20} />
        </div>

        <h3 className="font-semibold text-smoke-900 dark:text-smoke-100 line-clamp-1 flex-1">
          {version.title}
        </h3>

        {isPublished && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full flex-shrink-0">
            Current
          </span>
        )}
      </div>

      {version.coverImage && (
        <div className="aspect-[3/1] bg-smoke-100 dark:bg-smoke-800 rounded-t-md -mb-2 overflow-hidden">
          <img
            src={
              version.coverImage
                ? import.meta.env.VITE_API_URL + version.coverImage
                : "/assets/placeholder.webp"
            }
            alt={version.title || "Cover image"}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div
        className={classNames(
          "-mx-3 px-3 py-1 text-xs font-medium flex items-center justify-between",
          PostStatus.getStatusColor(version.status, "background")
        )}
        style={{
          boxShadow: "0 -0.5rem 1rem #0002",
        }}
      >
        <span>{PostStatus.getStatusText(version.status)}</span>

        <span className="opacity-75">
          {new Date(version.updatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.map((datum, index) => {
          const content = (
            <div
              key={index}
              className={classNames(
                "flex items-center py-1.5 px-2 gap-2 rounded-md text-sm transition-colors duration-200",
                {
                  "bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400":
                    !datum.href,
                  "bg-gopher-100 dark:bg-gopher-800 text-gopher-600 dark:text-gopher-400 hover:bg-gopher-200 dark:hover:bg-gopher-700":
                    datum.href,
                }
              )}
            >
              {datum.icon}

              <div>
                <div className="text-xs opacity-75">{datum.title}</div>

                <div className="font-medium line-clamp-1 text-xs">
                  {datum.value}
                </div>
              </div>
            </div>
          );
          if (datum.href)
            return (
              <Link key={index} to={datum.href}>
                {content}
              </Link>
            );
          return content;
        })}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t mt-auto border-smoke-100 dark:border-smoke-800">
        <PermissionGuard permission="post:view">
          <Button
            href={`/posts/${postId}/versions/${version.id}`}
            color="primary"
            iconRight={IconEye}
            className="flex-1"
          >
            View
          </Button>
        </PermissionGuard>

        {canEdit ? (
          <Button
            href={`/posts/${postId}/versions/${version.id}/edit`}
            color="warning"
            iconRight={IconEdit}
            className="flex-1"
          >
            Edit
          </Button>
        ) : (
          <PermissionGuard permission="post:create">
            <Button
              href={`/posts/${postId}/versions/${version.id}/duplicate`}
              color="success"
              iconRight={IconCopy}
              className="flex-1"
            >
              Duplicate
            </Button>
          </PermissionGuard>
        )}
      </div>
    </div>
  );
};

export default PostVersionCard;
