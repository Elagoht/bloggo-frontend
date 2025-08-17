import { useNavigate } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import toast from "solid-toast";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import { deleteCategory } from "../services/categories";

type CategoryDeleteFormProps = {
  category: ResponseCategory;
};

const CategoryDeleteForm: ParentComponent<CategoryDeleteFormProps> = ({
  category,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deleteCategory(category.slug);

    if (!response.success) return toast.error("Couln't delete the category");

    navigate("/categories");
    toast.success(`${category.name} has been deleted`);
  };

  return (
    <FormSection
      color="danger"
      legend="Caution! This action cannot be reversed."
    >
      <HoldButton color="danger" onclick={handleSubmit}>
        Hold to Delete
      </HoldButton>
    </FormSection>
  );
};

export default CategoryDeleteForm;
