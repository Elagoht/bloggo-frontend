import {
  IconClock,
  IconCopy,
  IconEdit,
  IconEye,
  IconUser,
  IconVersions,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { createVersionFromLatest } from "../../../../services/posts";
import Button from "../../../form/Button";
import PermissionGuard from "../../../Guards/PermissionGuard";
import { Link } from "react-router-dom";

interface PostVersionCardProps {
  version: PostVersionCard;
  postId: number;
  isPublished: boolean;
  onRefresh: () => void;
}

const PostVersionCard: FC<PostVersionCardProps> = ({
  version,
  postId,
  isPublished,
  onRefresh,
}) => {
  const isDraft = version.status === 0;
  const canEdit = isDraft;

  const handleDuplicate = async () => {
    try {
      const result = await createVersionFromLatest(postId);
      if (result.success) {
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to duplicate version:", error);
    }
  };

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
    {
      icon: <IconClock size={20} />,
      title: "Updated",
      value: new Date(version.updatedAt).toLocaleDateString(),
    },
  ];

  return (
    <div
      className={classNames(
        "bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-3 gap-3 flex flex-col transition-all duration-200",
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

      <div
        className={classNames(
          "-mx-3 px-3 py-1 text-xs font-medium text-center",
          getStatusColor(version.status)
        )}
      >
        {getStatusText(version.status)}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data.map((datum, index) => {
          const content = (
            <div
              key={index}
              className={classNames(
                "flex items-center py-2 px-3 gap-2 rounded-lg text-sm transition-colors duration-200",
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

                <div className="font-medium">{datum.value}</div>
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

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-smoke-100 dark:border-smoke-800">
        {canEdit ? (
          <PermissionGuard permission="post:edit">
            <Button
              href={`/posts/${postId}/versions/${version.id}/edit`}
              color="warning"
              iconRight={IconEdit}
              className="flex-1"
            >
              Edit
            </Button>
          </PermissionGuard>
        ) : (
          <PermissionGuard permission="post:create">
            <Button
              color="success"
              iconRight={IconCopy}
              onClick={handleDuplicate}
              className="flex-1"
            >
              Duplicate
            </Button>
          </PermissionGuard>
        )}

        <Button
          href={`/posts/${postId}/versions/${version.id}`}
          color="primary"
          iconRight={IconEye}
          className="flex-1"
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default PostVersionCard;

const getStatusColor = (status: number) => {
  switch (status) {
    case 0: // DRAFT
      return "bg-smoke-200 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400";
    case 1: // PENDING
      return "bg-yellow-200 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-400";
    case 2: // APPROVED
      return "bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400";
    case 3: // REJECTED
      return "bg-red-200 dark:bg-red-800 text-red-600 dark:text-red-400";
    case 4: // SCHEDULED
      return "bg-purple-200 dark:bg-purple-800 text-purple-600 dark:text-purple-400";
    case 5: // PUBLISHED
      return "bg-green-200 dark:bg-green-800 text-green-600 dark:text-green-400";
    default:
      return "bg-smoke-200 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400";
  }
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Draft";
    case 1:
      return "Pending";
    case 2:
      return "Approved";
    case 3:
      return "Rejected";
    case 4:
      return "Scheduled";
    case 5:
      return "Published";
    default:
      return "Unknown";
  }
};
