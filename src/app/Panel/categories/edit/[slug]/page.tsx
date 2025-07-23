import { useNavigate, useParams } from "@solidjs/router";
import { Component, createResource, Show } from "solid-js";
import ActivityDates from "../../../../../components/common/ActivityDates";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import H1 from "../../../../../components/typography/H1";
import H2 from "../../../../../components/typography/H2";
import CategoryDeleteForm from "../../../../../forms/CategoryDeleteForm";
import CategoryEditForm from "../../../../../forms/CategoryEditForm";
import { getCategory } from "../../../../../services/categories";

const CategoryEditPage: Component = () => {
  const navigate = useNavigate();

  const slug = useParams()["slug"];

  const [category] = createResource(async () => {
    const result = await getCategory(slug);

    if (!result.success) throw navigate("/categories");

    return result.data;
  });

  return (
    <ContentWithSidebar>
      <Show when={category()}>
        <Container>
          <H1>Edit Category</H1>

          <CategoryEditForm category={category()} />
        </Container>

        <Sidebar>
          <H2>Details</H2>

          <ActivityDates
            dates={[
              { time: category().createdAt, title: "Created At" },
              { time: category().updatedAt, title: "Updated At" },
            ]}
          />

          <H2>Danger Zone</H2>

          <CategoryDeleteForm category={category()} />
        </Sidebar>
      </Show>
    </ContentWithSidebar>
  );
};

export default CategoryEditPage;
