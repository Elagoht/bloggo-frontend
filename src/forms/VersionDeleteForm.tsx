import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HoldButton from "../components/form/HoldButton";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import { deletePostVersion } from "../services/posts";
import { FC } from "react";

type VersionDeleteFormProps = {
  postId: number;
  versionId: string;
  versionTitle: string;
  versionSlug?: string;
};

const VersionDeleteForm: FC<VersionDeleteFormProps> = ({
  postId,
  versionId,
  versionTitle,
  versionSlug,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deletePostVersion(postId, versionId);

    if (!response.success) {
      return toast.error("Couldn't delete the version");
    }

    if (versionSlug) {
      navigate(`/posts/details/${postId}`);
    } else {
      navigate("/posts");
    }
    toast.success(`Version "${versionTitle}" has been deleted`);
  };

  return (
    <FormCard color="danger">
      <SectionHeader icon={IconTrash} color="danger">
        Danger Zone
      </SectionHeader>

      <HoldButton color="danger" onClick={handleSubmit}>
        Hold to Delete Version
      </HoldButton>
    </FormCard>
  );
};

export default VersionDeleteForm;
