import { FC, ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import { deleteTag } from "../services/tags";

type TagDeleteFormProps = {
  tag: ResponseTag;
  children?: ReactNode;
};

const TagDeleteForm: FC<TagDeleteFormProps> = ({ tag }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deleteTag(tag.slug);

    if (!response.success) return toast.error("Couldn't delete the tag");

    navigate("/tags");
    toast.success(`${tag.name} has been deleted`);
  };

  return (
    <FormSection
      color="danger"
      legend="Caution! This action cannot be reversed."
    >
      <HoldButton color="danger" onClick={handleSubmit}>
        Hold to Delete
      </HoldButton>
    </FormSection>
  );
};

export default TagDeleteForm;