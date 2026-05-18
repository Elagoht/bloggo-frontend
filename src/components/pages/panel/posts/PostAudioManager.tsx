import { IconMusic, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../form/Button";
import PermissionGuard from "../../../Guards/PermissionGuard";
import SectionHeader from "../../../layout/SectionHeader";
import ButtonGroup from "../../../form/ButtonGroup";
import { deletePostAudio, uploadPostAudio } from "../../../../services/posts";
import Dialog from "../../../common/Dialog";

type PostAudioManagerProps = {
  post: PostDetails;
  onAudioUpdated: () => void;
};

const PostAudioManager: FC<PostAudioManagerProps> = ({
  post,
  onAudioUpdated,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".ogg")) {
      toast.error("Only OGG audio files are allowed");
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Audio file size must be less than 10MB");
      return;
    }

    try {
      setIsUploading(true);
      const response = await uploadPostAudio(post.postId, file);
      if (response.success) {
        toast.success("Audio uploaded successfully");
        onAudioUpdated();
      } else {
        toast.error(response.error?.message || "Failed to upload audio");
      }
    } catch {
      toast.error("Failed to upload audio");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      const response = await deletePostAudio(post.postId);
      if (response.success) {
        toast.success("Audio deleted successfully");
        setIsDeleteDialogOpen(false);
        onAudioUpdated();
      } else {
        toast.error(response.error?.message || "Failed to delete audio");
      }
    } catch {
      toast.error("Failed to delete audio");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SectionHeader icon={IconMusic}>Audio</SectionHeader>

      <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
        {post.audioFile ? (
          <div className="flex flex-col gap-4">
            <audio
              controls
              className="w-full"
              src={post.audioFile}
            >
              Your browser does not support the audio element.
            </audio>

            <PermissionGuard permission="post:update">
              <ButtonGroup alignment="end">
                <Button
                  color="danger"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  iconLeft={IconTrash}
                  variant="outline"
                >
                  Delete Audio
                </Button>
              </ButtonGroup>
            </PermissionGuard>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-smoke-500 dark:text-smoke-400">
              No audio file attached to this post
            </span>

            <PermissionGuard permission="post:update">
              <>
                <Button
                  color="primary"
                  disabled={isUploading}
                  iconLeft={isUploading ? undefined : IconUpload}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? "Uploading..." : "Upload Audio"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".ogg,audio/ogg"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
              </>
            </PermissionGuard>
          </div>
        )}
      </div>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Audio"
        actions={[
          {
            children: "Cancel",
            color: "danger",
            variant: "outline",
            onClick: () => setIsDeleteDialogOpen(false),
          },
          {
            children: isDeleting ? "Deleting..." : "Delete",
            color: "danger",
            iconLeft: IconTrash,
            onClick: handleDeleteConfirm,
            disabled: isDeleting,
          },
        ]}
      >
        <p>
          Are you sure you want to delete the audio file for "{post.title}"?
          This action cannot be undone.
        </p>
      </Dialog>
    </>
  );
};

export default PostAudioManager;
