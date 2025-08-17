import { useSearchParams } from "@solidjs/router";
import { IconPlus } from "@tabler/icons-solidjs";
import { Component, createResource, For, Show, Suspense } from "solid-js";
import Button from "../../../components/form/Button";
import Container from "../../../components/layout/Container";
import CardGrid from "../../../components/layout/Container/CardGrid";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import HeaderWithButton from "../../../components/layout/Container/HeaderWithButton";
import Sidebar from "../../../components/layout/Container/Sidebar";
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";
import H1 from "../../../components/typography/H1";
import H2 from "../../../components/typography/H2";
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
        <HeaderWithButton>
          <H1>Categories</H1>

          <Button
            href="/categories/create"
            color="success"
            class="self-end"
            iconRight={IconPlus}
          >
            New Category
          </Button>
        </HeaderWithButton>

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
        <H2>Filters</H2>

        <CategoryFiltersForm refetch={refetch} />
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoriesPage;
