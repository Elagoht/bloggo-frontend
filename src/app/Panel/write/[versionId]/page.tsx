import {
  IconDatabase,
  IconDeviceFloppy,
  IconEdit,
  IconFileDescription,
  IconHeading,
  IconPhoto,
  IconSignature,
  IconTag,
  IconTextCaption,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/form/Button";
import Form from "../../../../components/form/Form";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import Textarea from "../../../../components/form/Textarea";
import Container from "../../../../components/layout/Container";
import ContentWithSidebar from "../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../components/layout/SectionHeader";
import VersionDeleteForm from "../../../../forms/VersionDeleteForm";
import { getCategoriesList } from "../../../../services/categories";
import { getPostVersion, updatePostVersion } from "../../../../services/posts";

const EditVersionPage: FC = () => {
  const navigate = useNavigate();
  const { postId, versionId } = useParams<{
    postId: string;
    versionId: string;
  }>();
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [versionData, setVersionData] = useState<PostDetails | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load categories
        const categoriesResponse = await getCategoriesList();
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }

        // Load version data
        if (postId && versionId) {
          const versionResponse = await getPostVersion(
            parseInt(postId),
            versionId
          );
          if (versionResponse.success) {
            setVersionData(versionResponse.data);
            // Set cover preview if exists
            if (versionResponse.data.coverImage) {
              setCoverPreview(versionResponse.data.coverImage);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        alert("Failed to load version data");
        navigate("/posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [postId, versionId, navigate]);

  const handleFormSubmit = async (data: FormData) => {
    if (isSubmitting || !versionData || !postId || !versionId) return;

    try {
      setIsSubmitting(true);
      const form = new FormData();

      const title = data.get("title");
      const content = data.get("content");
      const cover = data.get("cover");
      const spot = data.get("spot");
      const description = data.get("description");
      const categoryId = data.get("categoryId");

      if (title) form.append("title", title);
      if (content) form.append("content", content);
      if (cover && (cover as File).size > 0) form.append("cover", cover);
      if (description) form.append("description", description);
      if (spot) form.append("spot", spot);
      if (categoryId) form.append("categoryId", categoryId);

      const response = await updatePostVersion(
        parseInt(postId),
        versionId,
        form
      );

      if (response.success) {
        navigate(`/posts/details/${postId}`, { replace: true });
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.error("Failed to update version:", error);
      alert("Failed to update version: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Loading version data...</div>
        </div>
      </Container>
    );
  }

  if (!versionData) {
    return (
      <Container size="lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-red-500">Version not found</div>
        </div>
      </Container>
    );
  }

  return (
    <Form handle={handleFormSubmit} className="w-full mx-auto">
      <ContentWithSidebar>
        <Container size="lg">
          <PageTitleWithIcon icon={IconEdit}>
            Edit Version - {versionData.title}
          </PageTitleWithIcon>

          <FormCard>
            <Input
              name="title"
              label="Title"
              iconLeft={IconHeading}
              type="text"
              placeholder="Enter post title..."
              defaultValue={versionData.title}
              required
            />

            <Input
              type="file"
              name="cover"
              label="Cover Image"
              accept="image/*"
              iconLeft={IconPhoto}
              onChange={async (event) => {
                const file = event.currentTarget?.files?.[0];

                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setCoverPreview(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setCoverPreview(versionData.coverImage || null);
                }
              }}
            />

            <Textarea
              name="content"
              label="Content (Markdown)"
              iconLeft={IconSignature}
              placeholder="Write your post content using Markdown..."
              rows={20}
              className="font-mono"
              defaultValue={versionData.content}
            />
          </FormCard>
        </Container>

        <Sidebar topMargin>
          <SectionHeader icon={IconDatabase}>SEO & Metadata</SectionHeader>

          <Input
            name="spot"
            iconLeft={IconTextCaption}
            label="Spot (Teaser)"
            type="text"
            placeholder="Short teaser text (max 75 chars)"
            maxLength={75}
            defaultValue={versionData.spot || ""}
          />

          <Textarea
            iconLeft={IconFileDescription}
            name="description"
            label="Meta Description"
            placeholder="Brief description for search engines (max 155 chars)"
            rows={3}
            maxLength={155}
            defaultValue={versionData.description || ""}
          />

          <Select
            name="categoryId"
            label="Category"
            icon={IconTag}
            placeholder="Select a category"
            options={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
              selected: category.id === versionData.category.id,
            }))}
          />

          {coverPreview && (
            <img
              className="aspect-video object-fill rounded-lg"
              src={
                coverPreview.startsWith("data:image/")
                  ? coverPreview
                  : import.meta.env.VITE_API_URL + coverPreview
              }
            />
          )}

          <Button
            type="submit"
            color="success"
            iconRight={IconDeviceFloppy}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>

          <VersionDeleteForm
            postId={parseInt(postId!)}
            versionId={versionId!}
            versionTitle={versionData.title || "Untitled"}
            versionSlug={versionData.slug}
          />
        </Sidebar>
      </ContentWithSidebar>
    </Form>
  );
};

export default EditVersionPage;
