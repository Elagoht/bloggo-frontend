import {
  IconCopy,
  IconDatabase,
  IconDeviceFloppy,
  IconFileDescription,
  IconHeading,
  IconPhoto,
  IconSignature,
  IconTag,
  IconTextCaption,
  IconVersions,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouteGuard from "../../../../../../../components/Guards/RouteGuard";
import Button from "../../../../../../../components/form/Button";
import Form from "../../../../../../../components/form/Form";
import Input from "../../../../../../../components/form/Input";
import Select from "../../../../../../../components/form/Select";
import Textarea from "../../../../../../../components/form/Textarea";
import Container from "../../../../../../../components/layout/Container";
import ContentWithSidebar from "../../../../../../../components/layout/Container/ContentWithSidebar";
import FormCard from "../../../../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../../../../components/layout/Container/PageTitle";
import Sidebar from "../../../../../../../components/layout/Container/Sidebar";
import SectionHeader from "../../../../../../../components/layout/SectionHeader";
import { getCategoriesList } from "../../../../../../../services/categories";
import {
  createVersionFromLatest,
  getPostVersion,
  updatePostVersion,
} from "../../../../../../../services/posts";

const DuplicateVersionPage: FC = () => {
  const navigate = useNavigate();
  const { postId, versionId } = useParams<{
    postId: string;
    versionId: string;
  }>();
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceVersion, setSourceVersion] = useState<PostDetails | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load categories
        const categoriesResponse = await getCategoriesList();
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }

        // Load source version data
        if (postId && versionId) {
          const versionResponse = await getPostVersion(
            parseInt(postId),
            versionId
          );
          if (versionResponse.success) {
            setSourceVersion(versionResponse.data);
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
    if (isSubmitting || !sourceVersion || !postId) return;

    try {
      setIsSubmitting(true);

      // First, create a new version from latest
      const createResponse = await createVersionFromLatest(parseInt(postId));
      if (!createResponse.success) {
        throw new Error(createResponse.error.message);
      }

      const newVersionId = createResponse.data.id;

      // Then update the new version with the source version data
      const updateForm = new FormData();

      const titleValue = data.get("title") as string;
      const title = titleValue || (sourceVersion.title as string);
      const content = (data.get("content") as string) || sourceVersion.content;
      const cover = data.get("cover") as File;
      const spot = (data.get("spot") as string) || sourceVersion.spot || "";
      const description =
        (data.get("description") as string) || sourceVersion.description || "";
      const categoryId =
        (data.get("categoryId") as string) ||
        sourceVersion.category?.id?.toString() ||
        "";

      updateForm.append("title", title);
      if (content) updateForm.append("content", content);
      if (cover && cover.size > 0) {
        updateForm.append("cover", cover);
      }
      if (description) updateForm.append("description", description);
      if (spot) updateForm.append("spot", spot);
      if (categoryId) updateForm.append("categoryId", categoryId);

      const updateResponse = await updatePostVersion(
        parseInt(postId),
        newVersionId.toString(),
        updateForm
      );

      if (updateResponse.success) {
        navigate(`/posts/details/${postId}`, { replace: true });
      } else {
        throw new Error(updateResponse.error.message);
      }
    } catch (error) {
      console.error("Failed to duplicate version:", error);
      alert("Failed to duplicate version: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <RouteGuard permission="post:create" redirectTo="/dashboard">
        <Container size="lg">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg">Loading version data...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  if (!sourceVersion) {
    return (
      <RouteGuard permission="post:create" redirectTo="/dashboard">
        <Container size="lg">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-red-500">Version not found</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard permission="post:create" redirectTo="/dashboard">
      <Form handle={handleFormSubmit} className="w-full mx-auto">
        <ContentWithSidebar>
          <Container size="lg">
            <PageTitleWithIcon icon={IconVersions}>
              Create A New Version
            </PageTitleWithIcon>

            <FormCard color="primary">
              <SectionHeader icon={IconCopy} color="primary">
                Duplicating from Version
              </SectionHeader>

              <small className="text-gopher-700 dark:text-gopher-300 text-xs">
                You are creating a new version based on "{sourceVersion.title}".
                You can modify the content below before creating the duplicate.
              </small>
            </FormCard>

            <FormCard>
              <Input
                name="title"
                label="Title"
                iconLeft={IconHeading}
                type="text"
                placeholder="Enter post title..."
                defaultValue={sourceVersion.title}
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
                    setCoverPreview(sourceVersion.coverImage || null);
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
                defaultValue={sourceVersion.content}
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
              defaultValue={sourceVersion.spot || ""}
            />

            <Textarea
              iconLeft={IconFileDescription}
              name="description"
              label="Meta Description"
              placeholder="Brief description for search engines (max 155 chars)"
              rows={3}
              maxLength={155}
              defaultValue={sourceVersion.description || ""}
            />

            <Select
              name="categoryId"
              label="Category"
              icon={IconTag}
              placeholder="Select a category"
              options={categories.map((category) => ({
                value: category.id.toString(),
                label: category.name,
                selected: category.id === sourceVersion.category?.id,
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
              {isSubmitting ? "Creating duplicate..." : "Create Duplicate"}
            </Button>
          </Sidebar>
        </ContentWithSidebar>
      </Form>
    </RouteGuard>
  );
};

export default DuplicateVersionPage;
