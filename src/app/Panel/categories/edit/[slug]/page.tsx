import { useNavigate, useParams } from "@solidjs/router";
import { Component, createResource, Show } from "solid-js";
import { IconCategory, IconInfoCircle, IconTrash } from "@tabler/icons-solidjs";
import ActivityDates from "../../../../../components/common/ActivityDates";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../components/layout/SectionHeader";
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
        <Container size="sm">
          <PageTitleWithIcon icon={IconCategory}>
            Edit Category: {category().name}
          </PageTitleWithIcon>

          <FormCard color="default">
            <CategoryEditForm category={category()} />
          </FormCard>
        </Container>

        <Sidebar>
          <SectionHeader icon={IconInfoCircle}>Details</SectionHeader>

          <ActivityDates
            dates={[
              { time: category().createdAt, title: "Created At" },
              { time: category().updatedAt, title: "Updated At" },
            ]}
          />

          <FormCard color="danger">
            <SectionHeader icon={IconTrash} color="danger">
              Danger Zone
            </SectionHeader>

            <CategoryDeleteForm category={category()} />
          </FormCard>
        </Sidebar>
      </Show>
    </ContentWithSidebar>
  );
};

export default CategoryEditPage;
