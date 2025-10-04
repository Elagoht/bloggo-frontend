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
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Dialog from "../../../../../../../components/common/Dialog";
import GenerativeFill from "../../../../../../../components/common/GenerativeFill";
import NoCategoriesYet from "../../../../../../../components/common/NoCategoriesYet";
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
import VersionActionsForm from "../../../../../../../forms/VersionActionsForm";
import VersionDeleteForm from "../../../../../../../forms/VersionDeleteForm";
import { getCategoriesList } from "../../../../../../../services/categories";
import {
  getPostVersion,
  getPostVersions,
  updatePostVersion,
} from "../../../../../../../services/posts";

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
  const [isDirty, setIsDirty] = useState(false);
  const [isLastVersion, setIsLastVersion] = useState(false);

  // Track current form values - initialize with empty strings to avoid uncontrolled->controlled warnings
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentSpot, setCurrentSpot] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");
  const [hasCoverChanged, setHasCoverChanged] = useState<boolean>(false);

  // Store initial form values for comparison
  const initialValues = useRef<{
    title: string;
    content: string;
    spot: string;
    description: string;
    categoryId: string;
    coverImage: string | null;
  } | null>(null);

  // Debounce timer
  const debounceTimer = useRef<number | null>(null);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blockerProceed, setBlockerProceed] = useState<null | (() => void)>(
    null
  );
  const [blockerReset, setBlockerReset] = useState<null | (() => void)>(null);

  const loadVersion = async () => {
    if (postId && versionId) {
      const [versionResponse, versionsResponse] = await Promise.all([
        getPostVersion(parseInt(postId), versionId),
        getPostVersions(parseInt(postId)),
      ]);

      if (versionResponse.success) {
        setVersion(versionResponse.data);
        setCurrentContent(versionResponse.data.content || "");
        setCurrentTitle(versionResponse.data.title || "");
        setCurrentSpot(versionResponse.data.spot || "");
        setCurrentDescription(versionResponse.data.description || "");
        setCurrentCategoryId(
          versionResponse.data.category?.id?.toString() || ""
        );
        setHasCoverChanged(false);

        // Set cover preview if exists
        if (versionResponse.data.coverImage) {
          setCoverPreview(versionResponse.data.coverImage);
        }

        // Store initial values for dirty tracking
        initialValues.current = {
          title: versionResponse.data.title || "",
          content: versionResponse.data.content || "",
          spot: versionResponse.data.spot || "",
          description: versionResponse.data.description || "",
          categoryId: versionResponse.data.category?.id?.toString() || "",
          coverImage: versionResponse.data.coverImage || "",
        };

        // Reset dirty state
        setIsDirty(false);
      }

      if (versionsResponse.success) {
        setIsLastVersion(versionsResponse.data.versions.length === 1);
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
      } catch {
        alert("Failed to load version data");
        navigate("/posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, versionId, navigate]);

  const handleVersionActionSuccess = useCallback(() => {
    // Redirect to version details page after successful submission
    navigate(`/posts/${postId}/versions/${versionId}`);
  }, [navigate, postId, versionId]);

  // Debounced function to check if form is dirty
  const checkIfDirty = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (!initialValues.current) return;

      // Normalize line endings for comparison (convert \r\n to \n)
      const normalizeLineEndings = (text: string) =>
        text.replace(/\r\n/g, "\n");

      const titleChanged = currentTitle !== initialValues.current!.title;
      const contentChanged =
        normalizeLineEndings(currentContent) !==
        normalizeLineEndings(initialValues.current!.content);
      const spotChanged = currentSpot !== initialValues.current!.spot;
      const descriptionChanged =
        normalizeLineEndings(currentDescription) !==
        normalizeLineEndings(initialValues.current!.description);
      const categoryChanged =
        currentCategoryId !== initialValues.current!.categoryId;

      const hasChanges =
        titleChanged ||
        contentChanged ||
        spotChanged ||
        descriptionChanged ||
        categoryChanged ||
        hasCoverChanged;

      setIsDirty(hasChanges);
    }, 300); // 300ms debounce
  }, [
    currentTitle,
    currentContent,
    currentSpot,
    currentDescription,
    currentCategoryId,
    hasCoverChanged,
  ]);

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
        toast.success("Version updated successfully");
        // Reload the version data to get the latest changes
        await loadVersion();
      } else {
        throw new Error(updateResponse.error.message);
      }
    } catch (error) {
      alert("Failed to update version: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, isSubmitting]);

  const blocker = useBlocker(isDirty && !isSubmitting);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setBlockerProceed(() => blocker.proceed);
      setBlockerReset(() => blocker.reset);
      setIsDialogOpen(true);
    }
  }, [blocker]);

  // Check if dirty whenever form values change
  useEffect(() => {
    checkIfDirty();
  }, [checkIfDirty]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);
    blockerProceed?.();
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    blockerReset?.();
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
    <>
      <Form handle={handleFormSubmit} className="w-full mx-auto">
        <ContentWithSidebar>
          <Container size="lg">
            <PageTitleWithIcon icon={IconVersions}>
              Edit Version
            </PageTitleWithIcon>

            <FormCard>
              <Input
                autoFocus
                name="title"
                label="Title"
                iconLeft={IconHeading}
                type="text"
                placeholder="Enter post title..."
                value={currentTitle}
                required
                onChange={(e) => setCurrentTitle(e.target.value)}
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
                    setHasCoverChanged(true);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setCoverPreview(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setHasCoverChanged(false);
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
                value={currentContent}
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
                  disabled={isDirty}
                  onCopy={(field, value) => {
                    if (field === "title") {
                      setCurrentTitle(value);
                    } else if (field === "spot (teaser)") {
                      // Truncate to max 75 characters
                      setCurrentSpot(value.substring(0, 75));
                    } else if (field === "meta description") {
                      // Truncate to max 155 characters
                      setCurrentDescription(value.substring(0, 155));
                    } else if (field === "suggested category") {
                      // Find the matching category by name
                      const matchingCategory = categories.find(
                        (cat) => cat.name.toLowerCase() === value.toLowerCase()
                      );
                      if (matchingCategory) {
                        setCurrentCategoryId(matchingCategory.id.toString());
                      }
                    }
                  }}
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
              value={currentSpot}
              onChange={(e) => setCurrentSpot(e.target.value)}
            />

            <Textarea
              iconLeft={IconFileDescription}
              name="description"
              label="Meta Description"
              placeholder="Brief description for search engines (max 155 chars)"
              rows={3}
              maxLength={155}
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
            />

            <NoCategoriesYet count={categories.length} />

            <Select
              name="categoryId"
              label="Category"
              icon={IconTag}
              placeholder="Select a category"
              value={currentCategoryId}
              options={categories.map((category) => ({
                value: category.id.toString(),
                label: category.name,
              }))}
              onChange={(e) => setCurrentCategoryId(e.target.value)}
            />

            {coverPreview && (
              <img
                className="aspect-video object-fill rounded-lg"
                alt="Cover"
                src={
                  coverPreview.startsWith("data:image/")
                    ? coverPreview
                    : import.meta.env.VITE_API_URL + coverPreview
                }
              />
            )}

            {isDirty && (
              <div className="text-warning-600 dark:text-warning-400 text-sm flex items-center gap-2 bg-warning-50 dark:bg-warning-900/20 p-3 rounded-lg border border-warning-200 dark:border-warning-800">
                <span className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></span>
                You have unsaved changes
              </div>
            )}

            <Button
              type="submit"
              color="success"
              iconRight={IconDeviceFloppy}
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

            {/* Version Actions */}
            {postId && versionId && (
              <>
                <SectionHeader>Version Actions</SectionHeader>

                <VersionActionsForm
                  key={`${version.status}-${isDirty}-${version.updatedAt}`}
                  postId={parseInt(postId)}
                  versionId={versionId}
                  currentStatus={version.status}
                  versionTitle={version.title}
                  versionAuthor={{
                    id: version.versionAuthor?.id || 0,
                    name: version.versionAuthor?.name || "Unknown",
                  }}
                  onSuccess={handleVersionActionSuccess}
                  disabled={isDirty}
                />
              </>
            )}

            {version.status === 0 && postId && versionId && (
              <VersionDeleteForm
                postId={parseInt(postId)}
                versionId={versionId}
                versionTitle={version.title}
                versionSlug={version.slug}
                isLastVersion={isLastVersion}
              />
            )}
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

export default EditVersionPage;
