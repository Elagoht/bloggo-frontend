import { Component, createResource, For, Show, Suspense } from "solid-js";
import { getCategories } from "../../../services/categories";
import Button from "../../../components/form/button";
import { IconPlus } from "@tabler/icons-solidjs";
import Container from "../../../components/layout/Container";
import CategoryCard from "../../../components/pages/panel/categories/CategoryCard";

const CategoriesPage: Component = () => {
  const [categories] = createResource(async () => {
    const result = await getCategories();
    return result.success ? result.data : [];
  });

  return (
    <Container>
      <Button href="/categories/create" color="success" class="self-end">
        Add New Category <IconPlus />
      </Button>

      <Suspense>
        <Show when={!categories.error}>
          <div class="grid grid-cols-cards gap-4 mt-2">
            <For
              each={categories()}
              fallback={
                <p class="text-center text-smoke-500 mt-12">
                  There's no category yet. Let's create one!
                </p>
              }
            >
              {(category) => (
                <CategoryCard
                  name={category.name}
                  slug={category.slug}
                  spot={category.spot}
                  blogCount={category.blogCount}
                />
              )}
            </For>
          </div>
        </Show>
      </Suspense>
    </Container>
  );
};

export default CategoriesPage;
