import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import HoldButton from "../components/form/HoldButton";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import { deletePostVersion } from "../services/posts";

type VersionDeleteFormProps = {
  postId: number;
  versionId: string;
  versionTitle: string;
  versionSlug?: string;
  isLastVersion?: boolean;
};

const VersionDeleteForm: FC<VersionDeleteFormProps> = ({
  postId,
  versionId,
  versionTitle,
  versionSlug,
  isLastVersion = false,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deletePostVersion(postId, versionId);

    if (!response.success) {
      return toast.error("Couldn't delete the version");
    }

    // Check if the entire post was deleted (when it was the last version)
    if (response.data?.postDeleted) {
      navigate("/posts");
      toast.success(`Post and all associated data have been deleted (last version removed)`);
    } else {
      // Normal version deletion
      if (versionSlug) {
        navigate(`/posts/details/${postId}`);
      } else {
        navigate("/posts");
      }
      toast.success(`Version "${versionTitle}" has been deleted`);
    }
  };

  return (
    <FormCard color="danger">
      <SectionHeader icon={IconTrash} color="danger">
        Danger Zone
      </SectionHeader>

      <HoldButton
        color="danger"
        onClick={handleSubmit}
        confirmTitle={isLastVersion ? "Delete Entire Post" : "Delete Version"}
        confirmMessage={
          isLastVersion
            ? `This is the last version of the post. Deleting it will permanently remove the entire post, including all associated images and data. This action cannot be undone.`
            : `Are you sure you want to delete version "${versionTitle}"? This action cannot be undone.`
        }
        confirmActionText={isLastVersion ? "Delete Post" : "Delete Version"}
      >
        {isLastVersion ? "Hold to Delete Post" : "Hold to Delete Version"}
      </HoldButton>
    </FormCard>
  );
};

export default VersionDeleteForm;
