import { Component, createResource, Show, Suspense } from "solid-js";
import { getCategories } from "../../../services/categories";

const CategoriesPage: Component = () => {
  const [categories] = createResource(() => getCategories());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show
        when={!categories.error}
        fallback={<div>Error: {categories.error?.message}</div>}
      >
        <pre>{JSON.stringify(categories(), null, 2)}</pre>
      </Show>
    </Suspense>
  );
};

export default CategoriesPage;
