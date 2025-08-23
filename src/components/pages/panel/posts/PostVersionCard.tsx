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
import SectionHeader from "../../../layout/SectionHeader";

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

  return (
    <section
      className={classNames(
        "bg-smoke-0 dark:bg-smoke-950 rounded-xl border transition-all duration-200",
        {
          "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/30":
            isPublished,
          "border-smoke-200 dark:border-smoke-800 hover:border-gopher-300 dark:hover:border-gopher-700":
            !isPublished,
        }
      )}
    >
      <div className="flex flex-col items-start justify-between p-4 gap-4">
        <SectionHeader
          icon={IconVersions}
          color={isPublished ? "success" : "primary"}
        >
          {version.title} {isPublished && "(Current)"}
        </SectionHeader>

        <dl className="flex items-center gap-4 text-sm text-smoke-500">
          <dt className="flex items-center gap-1">
            <IconUser size={14} />

            <dd>{version.versionAuthor.name}</dd>
          </dt>

          <dt className="flex items-center gap-1">
            <IconClock size={14} />

            <dd>{new Date(version.updatedAt).toLocaleDateString()}</dd>
          </dt>
        </dl>
      </div>

      <span
        className={classNames(
          "flex items-center gap-1 px-4 py-2 text-xs font-medium",
          getStatusColor(version.status)
        )}
      >
        {getStatusText(version.status)}
      </span>

      <div className="flex items-stretch overflow-hidden p-1 gap-1">
        {canEdit ? (
          <PermissionGuard permission="post:edit">
            <Button
              href={`/posts/${postId}/versions/${version.id}/edit`}
              color="warning"
              variant="text"
              iconRight={IconEdit}
              className="grow"
            >
              Edit
            </Button>
          </PermissionGuard>
        ) : (
          <PermissionGuard permission="post:create">
            <Button
              color="success"
              variant="text"
              iconRight={IconCopy}
              onClick={handleDuplicate}
              className="grow"
            >
              Duplicate
            </Button>
          </PermissionGuard>
        )}

        <Button
          href={`/posts/${postId}/versions/${version.id}`}
          color="primary"
          className="grow"
          iconRight={IconEye}
        >
          View
        </Button>
      </div>
    </section>
  );
};

export default PostVersionCard;

const getStatusColor = (status: number) => {
  switch (status) {
    case 0: // DRAFT
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400";
    case 1: // PENDING
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400";
    case 2: // APPROVED
      return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400";
    case 3: // REJECTED
      return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400";
    case 4: // SCHEDULED
      return "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400";
    case 5: // PUBLISHED
      return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400";
    default:
      return "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400";
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
