import {
  IconEye,
  IconInfoCircle,
  IconTag,
  IconTags,
  IconUser,
  IconVersions,
} from "@tabler/icons-react";
import { marked } from "marked";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ActivityDates from "../../../../../../components/common/ActivityDates";
import DetailsItem from "../../../../../../components/common/DetailsItem";
import ReviewNote from "../../../../../../components/common/ReviewNote";
import TagChip from "../../../../../../components/common/TagChip";
import PermissionGuard from "../../../../../../components/guards/PermissionGuard";
import RouteGuard from "../../../../../../components/guards/RouteGuard";
import Container from "../../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../../components/layout/SectionHeader";
import VersionActionsForm from "../../../../../../forms/VersionActionsForm";
import VersionDeleteForm from "../../../../../../forms/VersionDeleteForm";
import { getPostVersion, getPostVersions } from "../../../../../../services/posts";
import { PostStatus } from "../../../../../../utilities/PostStatusUtils";

const ViewVersionPage: FC = () => {
  const { postId, versionId } = useParams<{
    postId: string;
    versionId: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState<PostVersionDetails | null>(null);
  const [isLastVersion, setIsLastVersion] = useState(false);

  const loadVersion = async () => {
    try {
      setIsLoading(true);

      if (postId && versionId) {
        const [versionResponse, versionsResponse] = await Promise.all([
          getPostVersion(parseInt(postId), versionId),
          getPostVersions(parseInt(postId))
        ]);

        if (versionResponse.success) {
          setVersion(versionResponse.data);
        }

        if (versionsResponse.success) {
          setIsLastVersion(versionsResponse.data.versions.length === 1);
        }
      }
    } catch (error) {
      console.error("Failed to load version:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, versionId]);

  if (isLoading) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Loading version...</div>
        </div>
      </Container>
    );
  }

  if (!version) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-red-500">Version not found</div>
        </div>
      </Container>
    );
  }

  return (
    <RouteGuard permission="post:view">
      <ContentWithSidebar>
        <Container size="lg">
          <PageTitleWithIcon icon={IconEye}>Version Preview</PageTitleWithIcon>

          {/* Cover Image */}
          {version.coverImage && (
            <img
              src={import.meta.env.VITE_API_URL + version.coverImage}
              alt={version.title}
              className="w-full h-full aspect-video object-cover rounded-lg"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-smoke-900 dark:text-smoke-100">
            {version.title}
          </h1>

          {/* Spot/Teaser */}
          {version.spot && (
            <p className="text-xl text-smoke-700 dark:text-smoke-300 leading-relaxed">
              {version.spot}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: marked(version.content || ""),
              }}
            />
          </div>
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconInfoCircle}>Version Details</SectionHeader>

          {/* Status */}
          <DetailsItem icon={IconVersions} title="Status">
            <span
              className={`text-xs ${PostStatus.getStatusColor(
                version.status,
                "text"
              )}`}
            >
              {PostStatus.getStatusText(version.status)}
            </span>
          </DetailsItem>

          {/* Author */}
          <DetailsItem
            image={import.meta.env.VITE_API_URL + version.versionAuthor?.avatar}
            icon={IconUser}
            title="Author"
          >
            <Link
              to={`/users/details/${version.versionAuthor?.id}`}
              className="flex items-center gap-2 text-xs text-smoke-600 dark:text-smoke-300 hover:text-smoke-800 dark:hover:text-smoke-100 transition-colors"
            >
              {version.versionAuthor?.name}
            </Link>
          </DetailsItem>

          {/* Category */}
          {version.category && (
            <DetailsItem icon={IconTag} title="Category">
              <Link to={`/categories/details/${version.category.slug}`}>
                {version.category.name}
              </Link>
            </DetailsItem>
          )}

          {/* Tags */}
          {version.tags && version.tags.length > 0 && (
            <DetailsItem icon={IconTags} title="Tags">
              <div className="flex flex-wrap gap-1">
                {version.tags.map((tag) => (
                  <TagChip key={tag.id} tag={tag} size="sm" />
                ))}
              </div>
            </DetailsItem>
          )}

          {/* Review Note */}
          <ReviewNote
            status={version.status}
            note={version.statusChangeNote}
            changedBy={version.statusChangedBy}
            changedAt={version.statusChangedAt}
          />

          {/* Timestamps */}
          <ActivityDates
            dates={[
              { time: version.createdAt, title: "Created At" },
              { time: version.updatedAt, title: "Updated At" },
            ]}
          />

          {/* Version Actions - Show if user can perform any action */}
          {postId && versionId && (
            <>
              <SectionHeader>Version Actions</SectionHeader>
              <VersionActionsForm
                postId={parseInt(postId)}
                versionId={versionId}
                currentStatus={version.status}
                versionTitle={version.title}
                versionAuthor={{
                  id: version.versionAuthor?.id || 0,
                  name: version.versionAuthor?.name || "Unknown",
                }}
                onSuccess={loadVersion}
              />
            </>
          )}

          {/* Delete Button for users with post:delete permission */}
          <PermissionGuard permission="post:delete">
            {postId && versionId && (
              <VersionDeleteForm
                postId={parseInt(postId)}
                versionId={versionId}
                versionTitle={version.title}
                versionSlug={version.slug}
                isLastVersion={isLastVersion}
              />
            )}
          </PermissionGuard>
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default ViewVersionPage;
