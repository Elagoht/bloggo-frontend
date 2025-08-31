import { IconFileText, IconHistory } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RouteGuard from "../../../../../components/Guards/RouteGuard";
import Container from "../../../../../components/layout/Container";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import PostVersionCard from "../../../../../components/pages/panel/posts/PostVersionCard";
import { getPost, getPostVersions } from "../../../../../services/posts";
import CardGrid from "../../../../../components/layout/Container/CardGrid";
import PostDetails from "../../../../../components/pages/panel/posts/PostDetails";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import PostTagsManager from "../../../../../components/pages/panel/posts/PostTagsManager";

const PostDetailsPage: FC = () => {
  const { slug, postId } = useParams<{ slug?: string; postId?: string }>();

  const [post, setPost] = useState<PostDetails | null>(null);
  const [versionsResponse, setVersionsResponse] =
    useState<ResponsePostVersions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug, postId]);

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
    </RouteGuard>
  );
};

export default PostDetailsPage;
