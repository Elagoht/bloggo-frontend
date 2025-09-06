import { IconTag, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivityDates from "../../../../../components/common/ActivityDates";
import TagViewCard from "../../../../../components/common/TagViewCard";
import Container from "../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../components/layout/SectionHeader";
import PermissionGuard from "../../../../../components/guards/PermissionGuard";
import TagDeleteForm from "../../../../../forms/TagDeleteForm";
import TagEditForm from "../../../../../forms/TagEditForm";
import { getTag } from "../../../../../services/tags";

const TagDetailPage: FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<ResponseTag>();
  const [loading, setLoading] = useState(false);

  const fetchTag = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const result = await getTag(slug);

      if (!result.success) {
        navigate("/tags");
        return;
      }

      setTag(result.data);
    } catch {
      navigate("/tags");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchTag();
  }, [fetchTag]);

  if (loading || !tag) {
    return null;
  }

  return (
    <ContentWithSidebar>
      <Container size="sm">
        <PermissionGuard
          permission="tag:update"
          fallback={
            <PageTitleWithIcon icon={IconTag}>
              Tag: {tag.name}
            </PageTitleWithIcon>
          }
        >
          <PageTitleWithIcon icon={IconTag}>
            Edit Tag: {tag.name}
          </PageTitleWithIcon>
        </PermissionGuard>

        <PermissionGuard
          permission="tag:update"
          fallback={<TagViewCard tag={tag} />}
        >
          <FormCard color="default">
            <TagEditForm tag={tag} />
          </FormCard>
        </PermissionGuard>
      </Container>

      <Sidebar topMargin>
        <SectionHeader icon={IconInfoCircle}>Details</SectionHeader>

        <ActivityDates
          dates={[
            { time: tag.createdAt, title: "Created At" },
            { time: tag.updatedAt, title: "Updated At" },
          ]}
        />

        <PermissionGuard permission="tag:delete">
          <FormCard color="danger">
            <SectionHeader icon={IconTrash} color="danger">
              Danger Zone
            </SectionHeader>

            <TagDeleteForm tag={tag} />
          </FormCard>
        </PermissionGuard>
      </Sidebar>
    </ContentWithSidebar>
  );
};

export default TagDetailPage;
