import { useSearchParams } from "@solidjs/router";
import { IconCategory, IconFilter, IconPlus } from "@tabler/icons-solidjs";
import { Component, createResource, For, Show, Suspense } from "solid-js";
import Button from "../../../components/form/Button";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";
import CategoryFiltersForm from "../../../forms/CategoryFiltersForm";
import { getCategories } from "../../../services/categories";
import NoCategoriesYet from "../../../components/pages/panel/categories/NoCampaigns";

const CategoriesPage: Component = () => {
  const [searchParams] = useSearchParams();

  const [categories, { refetch }] = createResource(async () => {
    const result = await getCategories({
      q: searchParams.q as string,
      order: searchParams.order as string,
      dir: searchParams.dir as string,
    });
    return result.success ? result.data : [];
  });

  return (
    <ContentWithSidebar>
      <Container>
        <div class="flex items-center justify-between">
          <PageTitleWithIcon icon={IconCategory}>Categories</PageTitleWithIcon>

          <Button
            href="/categories/create"
            color="success"
            iconRight={IconPlus}
          >
            New Category
          </Button>
        </div>

        <Suspense>
          <Show when={!categories.error}>
            <CardGrid>
              <For each={categories()} fallback={<NoCategoriesYet />}>
                {(category) => (
                  <CategoryCard
                    name={category.name}
                    slug={category.slug}
                    spot={category.spot}
                    blogCount={category.blogCount}
                  />
                )}
              </For>
            </CardGrid>
          </Show>
        </Suspense>
      </Container>

      <Sidebar>
        <SectionHeader icon={IconFilter}>Filters</SectionHeader>

        <CategoryFiltersForm refetch={refetch} />
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoriesPage;
