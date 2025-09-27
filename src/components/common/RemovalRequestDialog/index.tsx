import { FC, useState } from "react";
import Dialog from "../Dialog";
import Textarea from "../../form/Textarea";
import { createRemovalRequest } from "../../../services/removal-requests";

interface RemovalRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postVersionId: number;
  postTitle: string;
  onSuccess?: () => void;
}

const RemovalRequestDialog: FC<RemovalRequestDialogProps> = ({
  isOpen,
  onClose,
  postVersionId,
  postTitle,
  onSuccess,
}) => {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await createRemovalRequest({
        postVersionId,
        note: note.trim() || undefined,
      });

      if (result.success) {
        onSuccess?.();
        onClose();
        setNote("");
      } else {
        setError(result.error?.message || "Failed to create removal request");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setNote("");
      setError(null);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Request Post Removal"
      size="md"
      actions={[
        {
          onClick: handleClose,
          children: "Cancel",
          variant: "outline",
          color: "primary",
          disabled: isSubmitting,
        },
        {
          onClick: handleSubmit,
          children: isSubmitting ? "Submitting..." : "Submit Request",
          color: "danger",
          disabled: isSubmitting,
        },
      ]}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-smoke-600 dark:text-smoke-400 mb-2">
            You are requesting removal of the post:
          </p>
          <p className="font-medium text-smoke-900 dark:text-smoke-100">
            "{postTitle}"
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-smoke-700 dark:text-smoke-300 mb-2">
            Reason for removal (optional)
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Please provide a reason for requesting this post's removal..."
            rows={4}
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="text-xs text-smoke-500 dark:text-smoke-400 mt-1">
            {note.length}/500 characters
          </div>
        </div>

        {error && (
          <div className="text-sm text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="text-sm text-smoke-600 dark:text-smoke-400 bg-smoke-50 dark:bg-smoke-900/50 p-3 rounded-lg">
          <strong>Note:</strong> Once submitted, your request will be reviewed by
          administrators. You will be notified of the decision.
        </div>
      </div>
    </Dialog>
  );
};

export default RemovalRequestDialog;