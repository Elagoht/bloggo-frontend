import {
  IconDeviceFloppy,
  IconEdit,
  IconTags,
  IconX,
} from "@tabler/icons-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../form/Button";
import PermissionGuard from "../../Guards/PermissionGuard";
import SectionHeader from "../../layout/SectionHeader";
import TagChip from "../../common/TagChip";
import ButtonGroup from "../../form/ButtonGroup";
import CheckboxGroup from "../../form/Checkbox/CheckboxGroup";
import { assignTagsToPost } from "../../../services/posts";
import { getTags } from "../../../services/tags";

interface PostTagsManagerProps {
  post: PostDetails;
  onTagsUpdated: () => void;
}

const PostTagsManager: FC<PostTagsManagerProps> = ({ post, onTagsUpdated }) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [allTags, setAllTags] = useState<TagCard[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isSavingTags, setIsSavingTags] = useState(false);

  const loadAllTags = async () => {
    try {
      setIsLoadingTags(true);
      const response = await getTags({ take: 100 });
      if (response.success) {
        setAllTags(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load tags:", error);
    } finally {
      setIsLoadingTags(false);
    }
  };

  const handleEditTags = async () => {
    if (!isEditingTags) {
      setSelectedTagIds(post.tags.map((tag) => tag.id.toString()));
      await loadAllTags();
    }
    setIsEditingTags(!isEditingTags);
  };

  const handleSaveTags = async () => {
    try {
      setIsSavingTags(true);
      const numericTagIds = selectedTagIds.map((id) => parseInt(id));
      const response = await assignTagsToPost(post.postId, numericTagIds);
      if (response.success) {
        toast.success("Tags updated successfully");
        setIsEditingTags(false);
        onTagsUpdated();
      } else {
        toast.error("Failed to update tags");
      }
    } catch (error) {
      console.error("Failed to save tags:", error);
      toast.error("Failed to update tags");
    } finally {
      setIsSavingTags(false);
    }
  };

  return (
    <>
      <SectionHeader icon={IconTags}>Tags</SectionHeader>

      <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-3">
        {!isEditingTags && (
          <div className="flex gap-4 flex-wrap justify-between items-start">
            <div className="flex flex-wrap gap-x-1">
              {post.tags && post.tags.length > 0 ? (
                post.tags.map((tag) => (
                  <TagChip key={tag.id} tag={tag} size="md" />
                ))
              ) : (
                <span className="text-smoke-500 dark:text-smoke-400">
                  No tags assigned to this post
                </span>
              )}
            </div>

            <PermissionGuard permission="tag:assign">
              <Button
                color="warning"
                onClick={handleEditTags}
                disabled={isLoadingTags}
                iconRight={IconEdit}
                shortcutKey="ctrlOrCmd+E"
              >
                {isLoadingTags ? "Loading..." : "Edit"}
              </Button>
            </PermissionGuard>
          </div>
        )}

        {isEditingTags && (
          <div className="flex flex-col gap-4">
            <small className="text-smoke-500 leading-3">
              Select tags to assign to this post:
            </small>

            <div className="max-h-60 overflow-y-auto border border-smoke-200 dark:border-smoke-700 rounded-lg p-2 grid grid-cols-tags">
              <CheckboxGroup
                values={selectedTagIds}
                onChange={setSelectedTagIds}
                options={allTags.map((tag) => ({
                  label: `${tag.name}`,
                  value: tag.id.toString(),
                }))}
              />
            </div>

            <ButtonGroup alignment="end">
              <Button
                onClick={handleSaveTags}
                disabled={isSavingTags}
                color="success"
                shortcutKey="Enter"
                iconLeft={IconDeviceFloppy}
              >
                {isSavingTags ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                variant="outline"
                color="danger"
                onClick={() => setIsEditingTags(false)}
                disabled={isSavingTags}
                shortcutKey="Escape"
                iconLeft={IconX}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    </>
  );
};

export default PostTagsManager;
