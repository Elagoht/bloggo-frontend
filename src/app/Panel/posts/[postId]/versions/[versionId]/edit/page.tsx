import {
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
  getPostVersion,
  updatePostVersion,
} from "../../../../../../../services/posts";
import VersionDeleteForm from "../../../../../../../forms/VersionDeleteForm";
import VersionActionsForm from "../../../../../../../forms/VersionActionsForm";
import GenerativeFill from "../../../../../../../components/common/GenerativeFill";

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
  const [version, setVersion] = useState<PostVersionDetails | null>(null);
  const [currentContent, setCurrentContent] = useState<string>("");

  const loadVersion = async () => {
    if (postId && versionId) {
      const versionResponse = await getPostVersion(parseInt(postId), versionId);
      if (versionResponse.success) {
        setVersion(versionResponse.data);
        setCurrentContent(versionResponse.data.content || "");
        // Set cover preview if exists
        if (versionResponse.data.coverImage) {
          setCoverPreview(versionResponse.data.coverImage);
        }
      }
    }
  };

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
        await loadVersion();
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
    if (isSubmitting || !version || !postId || !versionId) return;

    try {
      setIsSubmitting(true);

      const updateResponse = await updatePostVersion(
        parseInt(postId),
        versionId,
        data
      );

      if (updateResponse.success) {
        navigate(`/posts/details/${postId}`, { replace: true });
      } else {
        throw new Error(updateResponse.error.message);
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

  if (!version) {
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
          <PageTitleWithIcon icon={IconVersions}>
            Edit Version
          </PageTitleWithIcon>

          <FormCard>
            <Input
              name="title"
              label="Title"
              iconLeft={IconHeading}
              type="text"
              placeholder="Enter post title..."
              defaultValue={version.title}
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
                  setCoverPreview(version.coverImage || null);
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
              defaultValue={version.content}
              onChange={(e) => setCurrentContent(e.target.value)}
            />
          </FormCard>

          {/* AI Generative Fill */}
          {postId && versionId && (
            <div className="mt-6">
              <GenerativeFill
                postId={parseInt(postId)}
                versionId={versionId}
                contentLength={currentContent.length}
                availableCategories={categories}
              />
            </div>
          )}
        </Container>

        <Sidebar topMargin>
          <SectionHeader>SEO & Metadata</SectionHeader>

          <Input
            name="spot"
            iconLeft={IconTextCaption}
            label="Spot (Teaser)"
            type="text"
            placeholder="Short teaser text (max 75 chars)"
            maxLength={75}
            defaultValue={version.spot || ""}
          />

          <Textarea
            iconLeft={IconFileDescription}
            name="description"
            label="Meta Description"
            placeholder="Brief description for search engines (max 155 chars)"
            rows={3}
            maxLength={155}
            defaultValue={version.description || ""}
          />

          <Select
            name="categoryId"
            label="Category"
            icon={IconTag}
            placeholder="Select a category"
            options={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
              selected: category.id === version.category?.id,
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
            {isSubmitting ? "Updating..." : "Update Version"}
          </Button>

          {/* Version Actions */}
          {postId && versionId && (
            <>
              <SectionHeader>Version Actions</SectionHeader>
              <VersionActionsForm
                postId={parseInt(postId)}
                versionId={versionId}
                currentStatus={version.status}
                versionTitle={version.title}
                versionAuthor={{
                  id: version.versionAuthor?.id || 0,
                  name: version.versionAuthor?.name || "Unknown",
                }}
                onSuccess={loadVersion}
              />
            </>
          )}

          {version.status === 0 && postId && versionId && (
            <VersionDeleteForm
              postId={parseInt(postId)}
              versionId={versionId}
              versionTitle={version.title}
              versionSlug={version.slug}
            />
          )}
        </Sidebar>
      </ContentWithSidebar>
    </Form>
  );
};

export default EditVersionPage;
