import { useSearchParams } from "react-router-dom";
import { IconCategory, IconFilter, IconPlus } from "@tabler/icons-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../components/form/Button";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import Pagination from "../../../components/layout/Container/Pagination";
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";
import CategoryFiltersForm from "../../../forms/CategoryFiltersForm";
import { getCategories } from "../../../services/categories";
import NoCategoriesYet from "../../../components/pages/panel/categories/NoCampaigns";

const CategoriesPage: React.FC = () => {
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
    <ContentWithSidebar>
      <Container>
        <div className="flex items-center justify-between">
          <PageTitleWithIcon icon={IconCategory}>Categories</PageTitleWithIcon>

          <Button
            href="/categories/create"
            color="success"
            iconRight={IconPlus}
          >
            New Category
          </Button>
        </div>

        {!loading && !error && categoriesResponse && (
          <>
            <CardGrid>
              {categoriesResponse.data && categoriesResponse.data.length > 0 ? (
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
                itemsPerPage={categoriesResponse.take || 10}
              />
            )}
          </>
        )}
      </Container>

      <Sidebar>
        <SectionHeader icon={IconFilter}>Filters</SectionHeader>

        <CategoryFiltersForm />
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoriesPage;
