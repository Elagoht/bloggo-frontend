import { IconFileText, IconHistory, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RemovalRequestDialog from "../../../../../components/common/RemovalRequestDialog";
import Button from "../../../../../components/form/Button";
import RouteGuard from "../../../../../components/guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import CardGrid from "../../../../../components/layout/Container/CardGrid";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import PostDetails from "../../../../../components/pages/panel/posts/PostDetails";
import PostTagsManager from "../../../../../components/pages/panel/posts/PostTagsManager";
import PostVersionCard from "../../../../../components/pages/panel/posts/PostVersionCard";
import { getPost, getPostVersions } from "../../../../../services/posts";

const PostDetailsPage: FC = () => {
  const { slug, postId } = useParams<{ slug?: string; postId?: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetails | null>(null);
  const [versionsResponse, setVersionsResponse] =
    useState<ResponsePostVersions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRemovalDialogOpen, setIsRemovalDialogOpen] = useState(false);

  const fetchPostDetails = useCallback(async () => {
    if (!slug && !postId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch post basic details - use slug if available, otherwise use postId
      const postResult = await getPost(slug || postId!);
      if (postResult.success) {
        setPost(postResult.data);

        // Fetch post versions using postId
        const versionsResult = await getPostVersions(postResult.data.postId);
        if (versionsResult.success) {
          setVersionsResponse(versionsResult.data);
        }
      } else {
        // If post is not found (404 or other error), redirect to posts list
        if (postResult.status === 404) {
          navigate("/posts");
          return;
        }
        setError(new Error(postResult.error?.message || "Failed to load post"));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug, postId, navigate]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  if (loading) {
    return (
      <RouteGuard permission="post:list" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-smoke-500 dark:text-smoke-400">Loading...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  if (error || !post) {
    return (
      <RouteGuard permission="post:list" redirectTo="/dashboard">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">Error loading post details</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  // Sort versions: published version first, then by update time
  const sortedVersions = versionsResponse?.versions
    ? [...versionsResponse.versions].sort((a, b) => {
        // Published version (status 5) always on top
        if (a.status === 5 && b.status !== 5) return -1;
        if (b.status === 5 && a.status !== 5) return 1;

        // If both are published or both are not published, sort by update time (newest first)
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      })
    : [];

  return (
    <RouteGuard permission="post:list" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconFileText}>
            Post Details
          </PageTitleWithIcon>

          <Button
            onClick={() => setIsRemovalDialogOpen(true)}
            color="danger"
            variant="outline"
          >
            {<IconTrash size={20} />}
            <span className="max-sm:hidden ml-2">Request Removal</span>
          </Button>
        </div>

        <PostDetails {...post} />

        <PostTagsManager post={post} onTagsUpdated={fetchPostDetails} />

        <SectionHeader icon={IconHistory}>
          Version History{" "}
          <small className="text-smoke-500 dark:text-smoke-500">
            {`(${sortedVersions.length} version${
              sortedVersions.length > 1 ? "s" : ""
            })`}
          </small>
        </SectionHeader>

        <CardGrid>
          {sortedVersions.map((version) => (
            <PostVersionCard
              key={version.id}
              version={version}
              postId={post.postId}
              isPublished={version.status === 5}
            />
          ))}
        </CardGrid>

        {sortedVersions.length === 0 && (
          <div className="text-center py-8 text-smoke-500 dark:text-smoke-400">
            No versions found for this post.
          </div>
        )}
      </Container>

      <RemovalRequestDialog
        isOpen={isRemovalDialogOpen}
        onClose={() => setIsRemovalDialogOpen(false)}
        postVersionId={post.versionId}
        postTitle={post.title || "Untitled Post"}
      />
    </RouteGuard>
  );
};

export default PostDetailsPage;
