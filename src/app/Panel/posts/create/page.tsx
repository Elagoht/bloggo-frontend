import {
  IconDatabase,
  IconDeviceFloppy,
  IconEdit,
  IconExclamationCircle,
  IconFileDescription,
  IconHeading,
  IconPhoto,
  IconSignature,
  IconSparkles,
  IconTag,
  IconTextCaption,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Link, useBlocker, useNavigate } from "react-router-dom";
import Dialog from "../../../../components/common/Dialog";
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
import { getCategoriesList } from "../../../../services/categories";
import { createPost } from "../../../../services/posts";
import NoCategoriesYet from "../../../../components/common/NoCategoriesYet";

const WritePage: FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(
    null
  );
  const [blockerReset, setBlockerReset] = useState<null | (() => void)>(null);

  useEffect(() => {
    getCategoriesList().then((response) => {
      if (!response.success) return;
      setCategories(response.data);
    });
  }, []);

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

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
        setIsDirty(false);
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

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (isDirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setBlockerProceed(() => blocker.proceed);
      setBlockerReset(() => blocker.reset);
      setIsDialogOpen(true);
    }
  }, [blocker]);

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);
    blockerProceed?.();
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    blockerReset?.();
  };

  return (
    <>
      <Form handle={handleFormSubmit} className="w-full mx-auto">
        <ContentWithSidebar>
          <Container size="lg">
            <PageTitleWithIcon icon={IconEdit}>
              Write New Post
            </PageTitleWithIcon>

            <FormCard>
              <Input
                autoFocus
                name="title"
                label="Title"
                iconLeft={IconHeading}
                type="text"
                placeholder="Enter post title..."
                required
                onChange={markDirty}
              />

              <Input
                type="file"
                name="cover"
                label="Cover Image"
                accept="image/*"
                iconLeft={IconPhoto}
                onChange={async (event) => {
                  markDirty();
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
                onChange={markDirty}
              />
            </FormCard>

            <FormCard color="warning">
              <SectionHeader icon={IconSparkles} color="warning">
                AI-Powered Content Suggestions
              </SectionHeader>

              <span className="text-warning-700 dark:text-warning-300 text-xs">
                You can access AI-generated suggestions for title, meta
                description, and spot text after saving your content as a draft.
                The AI will analyze your content and provide optimized
                suggestions to improve SEO and engagement.
              </span>
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
              onChange={markDirty}
            />

            <Textarea
              iconLeft={IconFileDescription}
              name="description"
              label="Meta Description"
              placeholder="Brief description for search engines (max 155 chars)"
              rows={3}
              maxLength={155}
              onChange={markDirty}
            />

            <NoCategoriesYet count={categories.length} />

            <Select
              name="categoryId"
              label="Category"
              icon={IconTag}
              placeholder="Select a category"
              options={categories.map((category) => ({
                value: category.id.toString(),
                label: category.name,
              }))}
              onChange={markDirty}
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

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogCancel}
        title="Unsaved Changes"
        actions={[
          {
            onClick: handleDialogCancel,
            children: "Cancel",
            variant: "outline",
            color: "primary",
            shortcutKey: "ctrlOrCmd+O",
          },
          {
            onClick: handleDialogConfirm,
            children: "Leave Page",
            color: "danger",
            shortcutKey: "ctrlOrCmd+Y",
          },
        ]}
      >
        You have unsaved changes. Are you sure you want to leave?
      </Dialog>
    </>
  );
};

export default WritePage;
