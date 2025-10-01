import {
  IconCheck,
  IconClock,
  IconSend,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Dialog from "../components/common/Dialog";
import Button from "../components/form/Button";
import Textarea from "../components/form/Textarea";
import { useProfileStore } from "../stores/profile";
import { useAuth } from "../hooks/useAuth";
import {
  approveVersion,
  publishVersion,
  rejectVersion,
  submitVersionForReview,
  updateVersionCategory,
} from "../services/posts";
import { getCategoriesList } from "../services/categories";

type VersionActionsFormProps = {
  postId: number;
  versionId: string;
  currentStatus: number;
  versionTitle: string;
  versionAuthor: {
    id: number;
    name: string;
  };
  onSuccess?: () => void;
  disabled?: boolean;
};

const VersionActionsForm: FC<VersionActionsFormProps> = ({
  postId,
  versionId,
  currentStatus,
  versionTitle,
  versionAuthor,
  onSuccess,
  disabled = false,
}) => {
  const { profile } = useProfileStore();
  const { hasPermission } = useAuth();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [note, setNote] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Load categories for the category selection modal
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategoriesList();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch {
        // Silently fail - categories will be empty
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await submitVersionForReview(postId, versionId);
      if (response.success) {
        toast.success("Version submitted for review");
        setIsSubmitDialogOpen(false);
        onSuccess?.();
      } else {
        toast.error("Failed to submit version for review");
      }
    } catch {
      toast.error("Failed to submit version for review");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await approveVersion(
        postId,
        versionId,
        note || undefined
      );
      if (response.success) {
        toast.success("Version approved");
        setIsApproveDialogOpen(false);
        setNote("");
        onSuccess?.();
      } else {
        toast.error("Failed to approve version");
      }
    } catch {
      toast.error("Failed to approve version");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    // Validate that rejection reason is provided
    if (!note.trim()) {
      toast.error("Rejection reason is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await rejectVersion(postId, versionId, note);
      if (response.success) {
        toast.success("Version rejected");
        setIsRejectDialogOpen(false);
        setNote("");
        onSuccess?.();
      } else {
        toast.error("Failed to reject version");
      }
    } catch {
      toast.error("Failed to reject version");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const response = await publishVersion(
        postId,
        versionId,
        publishedAt || undefined
      );
      if (response.success) {
        toast.success("Version published");
        setIsPublishDialogOpen(false);
        setPublishedAt("");
        onSuccess?.();
      } else {
        // Check if the error is 428 (category deleted)
        if (response.status === 428) {
          setIsPublishDialogOpen(false);
          setIsCategoryModalOpen(true);
        } else {
          toast.error(response.error?.message || "Failed to publish version");
        }
      }
    } catch {
      toast.error("Failed to publish version");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryUpdate = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateVersionCategory(
        postId,
        versionId,
        parseInt(selectedCategoryId)
      );
      if (response.success) {
        toast.success("Version published successfully");
        setIsCategoryModalOpen(false);
        setSelectedCategoryId("");
        onSuccess?.();
      } else {
        toast.error(response.error?.message || "Failed to update category and publish");
      }
    } catch {
      toast.error("Failed to update category and publish");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if current user is the version author
  const isVersionOwner = profile?.id === versionAuthor.id;

  // Permission checks
  const canSubmit = currentStatus === 0 && isVersionOwner; // DRAFT and owner (any user who can create posts)
  const canApprove = currentStatus === 1 && hasPermission("post:publish"); // PENDING (users with post:publish)
  const canReject =
    (currentStatus === 1 || currentStatus === 2) &&
    hasPermission("post:publish"); // PENDING or APPROVED (users with post:publish)
  const canPublish = currentStatus === 2 && hasPermission("post:publish"); // APPROVED (users with post:publish)

  // Only render if user can perform at least one action
  const hasAnyAction = canSubmit || canApprove || canReject || canPublish;

  if (!hasAnyAction) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Submit for Review */}
      {canSubmit && (
        <Button
          color="primary"
          iconRight={IconSend}
          onClick={() => setIsSubmitDialogOpen(true)}
          className="w-full"
          disabled={disabled}
          title={disabled ? "Save your changes first" : undefined}
        >
          Submit for Review
        </Button>
      )}

      {/* Approve */}
      {canApprove && (
        <Button
          color="success"
          iconRight={IconCheck}
          onClick={() => setIsApproveDialogOpen(true)}
          className="w-full"
          disabled={disabled}
          title={disabled ? "Save your changes first" : undefined}
        >
          Approve Version
        </Button>
      )}

      {/* Reject */}
      {canReject && (
        <Button
          color="danger"
          iconRight={IconX}
          onClick={() => setIsRejectDialogOpen(true)}
          className="w-full"
          disabled={disabled}
          title={disabled ? "Save your changes first" : undefined}
        >
          Reject Version
        </Button>
      )}

      {/* Publish */}
      {canPublish && (
        <Button
          color="success"
          iconRight={IconWorldWww}
          onClick={() => setIsPublishDialogOpen(true)}
          className="w-full"
          disabled={disabled}
          title={disabled ? "Save your changes first" : undefined}
        >
          Publish Version
        </Button>
      )}

      {/* Submit Dialog */}
      <Dialog
        isOpen={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
        title="Submit for Review"
        actions={[
          {
            children: "Cancel",
            variant: "outline",
            onClick: () => setIsSubmitDialogOpen(false),
          },
          {
            children: "Submit",
            color: "primary",
            onClick: handleSubmit,
            disabled: isLoading,
          },
        ]}
      >
        <p>
          Are you sure you want to submit the version "{versionTitle}" for
          review? Once submitted, you won't be able to edit it anymore. You can
          always create a new version.
        </p>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog
        isOpen={isApproveDialogOpen}
        onClose={() => setIsApproveDialogOpen(false)}
        title="Approve Version"
        size="lg"
        actions={[
          {
            children: "Cancel",
            variant: "outline",
            onClick: () => setIsApproveDialogOpen(false),
          },
          {
            children: "Approve",
            color: "success",
            onClick: handleApprove,
            disabled: isLoading,
          },
        ]}
      >
        <p className="mb-4">
          Approve the version "{versionTitle}"? This will mark it as ready for
          publishing.
        </p>

        <Textarea
          label="Approval Note (Optional)"
          placeholder="Add a note about the approval..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        isOpen={isRejectDialogOpen}
        onClose={() => {
          setIsRejectDialogOpen(false);
          setNote("");
        }}
        title="Reject Version"
        size="lg"
        actions={[
          {
            children: "Cancel",
            variant: "outline",
            onClick: () => {
              setIsRejectDialogOpen(false);
              setNote("");
            },
          },
          {
            children: "Reject",
            color: "danger",
            onClick: handleReject,
            disabled: isLoading || !note.trim(),
          },
        ]}
      >
        <p className="mb-4">
          Reject the version "{versionTitle}"? The author will be able to edit
          and resubmit it.
        </p>

        <Textarea
          label="Rejection Reason"
          placeholder="Explain why this version is being rejected..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          required
        />
      </Dialog>

      {/* Publish Dialog */}
      <Dialog
        isOpen={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        title="Publish Version"
        size="lg"
        actions={[
          {
            children: "Cancel",
            variant: "outline",
            onClick: () => setIsPublishDialogOpen(false),
          },
          {
            children: publishedAt ? "Schedule" : "Publish Now",
            color: "success",
            iconRight: publishedAt ? IconClock : IconWorldWww,
            onClick: handlePublish,
            disabled: isLoading,
          },
        ]}
      >
        <p>
          Publish the version "{versionTitle}"? This will make it live and
          visible to readers.
        </p>
      </Dialog>

      {/* Category Selection Modal (when category is deleted) */}
      <Dialog
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setSelectedCategoryId("");
        }}
        title="Update Category"
        size="lg"
        actions={[
          {
            children: "Cancel",
            variant: "outline",
            onClick: () => {
              setIsCategoryModalOpen(false);
              setSelectedCategoryId("");
            },
          },
          {
            children: "Update Category",
            color: "primary",
            onClick: handleCategoryUpdate,
            disabled: isLoading || !selectedCategoryId,
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-smoke-600">
            This version's category has been deleted. Please select a new
            category before publishing.
          </p>

          <div>
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2"
            >
              Select New Category <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="category-select"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-smoke-50 dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-lg transition-all duration-200 focus:outline-none focus:border-gopher-400 dark:focus:border-gopher-500 focus:ring-1 focus:ring-gopher-200 dark:focus:ring-gopher-800/50 text-smoke-900 dark:text-smoke-100"
            >
              <option value="">Choose a category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default VersionActionsForm;
