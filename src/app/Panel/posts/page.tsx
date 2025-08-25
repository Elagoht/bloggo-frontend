import { IconFileText, IconFilter, IconPlus } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../../components/form/Button";
import PermissionGuard from "../../../components/Guards/PermissionGuard";
import RouteGuard from "../../../components/Guards/RouteGuard";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Pagination from "../../../components/layout/Container/Pagination";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import PostCard from "../../../components/pages/panel/posts/PostCard";
import NoPostsYet from "../../../components/pages/panel/posts/NoPostsYet";
import PostFiltersForm from "../../../forms/PostFiltersForm";
import { getPosts } from "../../../services/posts";

const PostsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [postsResponse, setPostsResponse] =
    useState<ResponsePaginated<PostCard> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchFilters = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      order: searchParams.get("order") || "",
      dir: searchParams.get("dir") || "",
      status: searchParams.get("status")
        ? parseInt(searchParams.get("status")!)
        : undefined,
      categoryId: searchParams.get("categoryId")
        ? parseInt(searchParams.get("categoryId")!)
        : undefined,
      authorId: searchParams.get("authorId")
        ? parseInt(searchParams.get("authorId")!)
        : undefined,
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "12"),
    }),
    [searchParams]
  );

  const fetchPosts = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPosts(filters);
      setPostsResponse(result.success ? result.data : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(searchFilters);
  }, [fetchPosts, searchFilters]);

  return (
    <RouteGuard permission="post:list" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconFileText}>Posts</PageTitleWithIcon>

            <PermissionGuard permission="post:create">
              <Button href="/write" color="success" iconRight={IconPlus}>
                New Post
              </Button>
            </PermissionGuard>
          </div>

          {!loading && !error && (
            <>
              <CardGrid>
                {postsResponse &&
                postsResponse.data &&
                postsResponse.data.length > 0 ? (
                  postsResponse.data.map((post: PostCard) => (
                    <PostCard key={post.postId} {...post} />
                  ))
                ) : (
                  <NoPostsYet />
                )}
              </CardGrid>

              {postsResponse &&
                postsResponse.data &&
                postsResponse.data.length > 0 && (
                  <Pagination
                    totalItems={postsResponse.total}
                    itemsPerPage={postsResponse.take}
                  />
                )}
            </>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>

          <PostFiltersForm />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default PostsPage;
