import { IconCategory, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivityDates from "../../../../../components/common/ActivityDates";
import CategoryViewCard from "../../../../../components/common/CategoryViewCard";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import PermissionGuard from "../../../../../components/Guards/PermissionGuard";
import CategoryDeleteForm from "../../../../../forms/CategoryDeleteForm";
import CategoryEditForm from "../../../../../forms/CategoryEditForm";
import { getCategory } from "../../../../../services/categories";

const CategoryDetailPage: FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<ResponseCategory>();
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
    } catch {
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
        <PermissionGuard
          permission="category:update"
          fallback={
            <PageTitleWithIcon icon={IconCategory}>
              Category: {category.name}
            </PageTitleWithIcon>
          }
        >
          <PageTitleWithIcon icon={IconCategory}>
            Edit Category: {category.name}
          </PageTitleWithIcon>
        </PermissionGuard>

        <PermissionGuard
          permission="category:update"
          fallback={<CategoryViewCard category={category} />}
        >
          <FormCard color="default">
            <CategoryEditForm category={category} />
          </FormCard>
        </PermissionGuard>
      </Container>

      <Sidebar topMargin>
        <SectionHeader icon={IconInfoCircle}>Details</SectionHeader>

        <ActivityDates
          dates={[
            { time: category.createdAt, title: "Created At" },
            { time: category.updatedAt, title: "Updated At" },
          ]}
        />

        <PermissionGuard permission="category:delete">
          <FormCard color="danger">
            <SectionHeader icon={IconTrash} color="danger">
              Danger Zone
            </SectionHeader>

            <CategoryDeleteForm category={category} />
          </FormCard>
        </PermissionGuard>
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default CategoryDetailPage;
