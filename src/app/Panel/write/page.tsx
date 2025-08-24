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
import { useNavigate } from "react-router-dom";
import Button from "../../../components/form/Button";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Textarea from "../../../components/form/Textarea";
import Container from "../../../components/layout/Container";
import ContentWithSidebar from "../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import Sidebar from "../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../components/layout/SectionHeader";
import { getCategoriesList } from "../../../services/categories";
import { createPost } from "../../../services/posts";

const WritePage: FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCategoriesList().then((response) => {
      if (!response.success) return;
      setCategories(response.data);
    });
  }, []);

  const handleFormSubmit = async (data: FormData) => {
    if (isSubmitting) return;

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

      const response = await createPost(form);

      if (response.success) {
        navigate("/posts", { replace: true });
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form handle={handleFormSubmit} className="w-full mx-auto">
      <ContentWithSidebar>
        <Container size="lg">
          <PageTitleWithIcon icon={IconEdit}>Write New Post</PageTitleWithIcon>

          <FormCard>
            <Input
              name="title"
              label="Title"
              iconLeft={IconHeading}
              type="text"
              placeholder="Enter post title..."
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
                  setCoverPreview(null);
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
          />

          <Textarea
            iconLeft={IconFileDescription}
            name="description"
            label="Meta Description"
            placeholder="Brief description for search engines (max 155 chars)"
            rows={3}
            maxLength={155}
          />

          <Select
            name="categoryId"
            label="Category"
            icon={IconTag}
            placeholder="Select a category"
            options={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
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
            {isSubmitting ? "Creating..." : "Create Draft"}
          </Button>
        </Sidebar>
      </ContentWithSidebar>
    </Form>
  );
};

export default WritePage;
