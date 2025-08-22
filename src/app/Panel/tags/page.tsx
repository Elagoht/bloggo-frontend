import { IconTag, IconFilter, IconPlus } from "@tabler/icons-react";
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
import TagCard from "../../../components/pages/panel/tags/TagCard";
import NoTagsYet from "../../../components/pages/panel/tags/NoTagsYet";
import TagFiltersForm from "../../../forms/TagFiltersForm";
import { getTags } from "../../../services/tags";

const TagsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [tagsResponse, setTagsResponse] = useState<ResponsePaginated<TagCard> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchFilters = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      order: searchParams.get("order") || "",
      dir: searchParams.get("dir") || "",
      page: parseInt(searchParams.get("page") || "1"),
      take: parseInt(searchParams.get("take") || "10"),
    }),
    [searchParams]
  );

  const fetchTags = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getTags(filters);
      setTagsResponse(result.success ? result.data : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags(searchFilters);
  }, [fetchTags, searchFilters]);

  return (
    <RouteGuard permission="tag:list" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconTag}>Tags</PageTitleWithIcon>

            <PermissionGuard permission="tag:create">
              <Button href="/tags/create" color="success" iconRight={IconPlus}>
                New Tag
              </Button>
            </PermissionGuard>
          </div>

          {!loading && !error && (
            <>
              <CardGrid>
                {tagsResponse &&
                tagsResponse.data &&
                tagsResponse.data.length > 0 ? (
                  tagsResponse.data.map((tag: any) => (
                    <TagCard
                      key={tag.slug}
                      name={tag.name}
                      slug={tag.slug}
                      blogCount={tag.blogCount}
                    />
                  ))
                ) : (
                  <NoTagsYet />
                )}
              </CardGrid>

              {tagsResponse &&
                tagsResponse.data &&
                tagsResponse.data.length > 0 && (
                  <Pagination
                    totalItems={tagsResponse.total}
                    itemsPerPage={tagsResponse.take}
                    currentPage={tagsResponse.page}
                  />
                )}
            </>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>

          <TagFiltersForm />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default TagsPage;
