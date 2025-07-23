import { Component, createResource, For, Show, Suspense } from "solid-js";
import { getCategories } from "../../../services/categories";
import Button from "../../../components/form/Button";
import { IconPlus } from "@tabler/icons-solidjs";
import Container from "../../../components/layout/Container";
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";
import H1 from "../../../components/typography/H1";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import Sidebar from "../../../components/layout/Container/Sidebar";
import CardGrid from "../../../components/layout/Container/CardGrid";
import HeaderWithButton from "../../../components/layout/Container/HeaderWithButton";
import NoCategoriesYet from "./edit/NoCampaigns";

const CategoriesPage: Component = () => {
  const [categories] = createResource(async () => {
    const result = await getCategories();
    return result.success ? result.data : [];
  });

  return (
    <ContentWithSidebar>
      <Container>
        <HeaderWithButton>
          <H1>Categories</H1>

          <Button href="/categories/create" color="success" class="self-end">
            Add New Category <IconPlus />
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
        <H1>Filters</H1>
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoriesPage;
