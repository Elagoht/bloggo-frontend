import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { IconCategory, IconInfoCircle, IconTrash } from "@tabler/icons-react";
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

const CategoryEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategory = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const result = await getCategory(slug);

      if (!result.success) {
        navigate("/categories");
        return;
      }

      setCategory(result.data);
    } catch (error) {
      navigate("/categories");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  if (loading || !category) {
    return null;
  }

  return (
    <ContentWithSidebar>
      <Container size="sm">
        <PageTitleWithIcon icon={IconCategory}>
          Edit Category: {category.name}
        </PageTitleWithIcon>

        <FormCard color="default">
          <CategoryEditForm category={category} />
        </FormCard>
      </Container>

      <Sidebar topMargin>
        <SectionHeader icon={IconInfoCircle}>Details</SectionHeader>

        <ActivityDates
          dates={[
            { time: category.createdAt, title: "Created At" },
            { time: category.updatedAt, title: "Updated At" },
          ]}
        />

        <FormCard color="danger">
          <SectionHeader icon={IconTrash} color="danger">
            Danger Zone
          </SectionHeader>

          <CategoryDeleteForm category={category} />
        </FormCard>
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoryEditPage;
