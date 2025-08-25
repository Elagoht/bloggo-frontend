import {
  IconCalendar,
  IconClock,
  IconDetails,
  IconEye,
  IconInfoCircle,
  IconNote,
  IconTag,
  IconUser,
  IconVersions,
} from "@tabler/icons-react";
import { marked } from "marked";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RouteGuard from "../../../../../../components/Guards/RouteGuard";
import PermissionGuard from "../../../../../../components/Guards/PermissionGuard";
import Container from "../../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../../components/layout/SectionHeader";
import { getPostVersion } from "../../../../../../services/posts";
import VersionDeleteForm from "../../../../../../forms/VersionDeleteForm";
import ActivityDates from "../../../../../../components/common/ActivityDates";
import DetailsItem from "../../../../../../components/common/DetailsItem";
import VersionActionsForm from "../../../../../../forms/VersionActionsForm";
import { PostStatus } from "../../../../../../utilities/PostStatusUtils";

const ViewVersionPage: FC = () => {
  const { postId, versionId } = useParams<{
    postId: string;
    versionId: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState<PostVersionDetails | null>(null);

  const loadVersion = async () => {
    try {
      setIsLoading(true);

      if (postId && versionId) {
        const versionResponse = await getPostVersion(
          parseInt(postId),
          versionId
        );
        if (versionResponse.success) {
          setVersion(versionResponse.data);
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
              />
            )}
          </PermissionGuard>
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default ViewVersionPage;
