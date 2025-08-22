import { IconCategory, IconFilter, IconPlus } from "@tabler/icons-react";
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
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";
import NoCategoriesYet from "../../../components/pages/panel/categories/NoCategoriesYet";
import CategoryFiltersForm from "../../../forms/CategoryFiltersForm";
import { getCategories } from "../../../services/categories";

const CategoriesPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [categoriesResponse, setCategoriesResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create a reactive memo for search params that will trigger resource updates
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

  const fetchCategories = useCallback(async (filters: typeof searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategories(filters);
      setCategoriesResponse(result.success ? result.data : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(searchFilters);
  }, [fetchCategories, searchFilters]);

  return (
    <RouteGuard permission="category:list" redirectTo="/dashboard">
      <ContentWithSidebar>
        <Container>
          <div className="flex items-center justify-between">
            <PageTitleWithIcon icon={IconCategory}>
              Categories
            </PageTitleWithIcon>

            <PermissionGuard permission="category:create">
              <Button
                href="/categories/create"
                color="success"
                iconRight={IconPlus}
              >
                New Category
              </Button>
            </PermissionGuard>
          </div>

          {!loading && !error && categoriesResponse && (
            <>
              <CardGrid>
                {categoriesResponse.data &&
                categoriesResponse.data.length > 0 ? (
                  categoriesResponse.data.map((category: any) => (
                    <CategoryCard
                      key={category.slug}
                      name={category.name}
                      slug={category.slug}
                      spot={category.spot}
                      blogCount={category.blogCount}
                    />
                  ))
                ) : (
                  <NoCategoriesYet />
                )}
              </CardGrid>

              {categoriesResponse && (
                <Pagination
                  totalItems={categoriesResponse.total || 0}
                  itemsPerPage={categoriesResponse.take || 12}
                />
              )}
            </>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconFilter}>Filters</SectionHeader>

          <CategoryFiltersForm />
        </Sidebar>
      </ContentWithSidebar>
    </RouteGuard>
  );
};

export default CategoriesPage;
