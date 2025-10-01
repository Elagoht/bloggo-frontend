import { FC, ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import { deleteCategory } from "../services/categories";

type CategoryDeleteFormProps = {
  category: ResponseCategory;
  children?: ReactNode;
};

const CategoryDeleteForm: FC<CategoryDeleteFormProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deleteCategory(category.slug);

    if (!response.success) {
      if (
        response.error?.message ===
        "Cannot delete category with published blogs."
      ) {
        toast.error(
          `Cannot delete ${category.name} because it has published blogs`
        );
        navigate(`/posts?categoryId=${category.id}`);
        return;
      }
      return toast.error("Couln't delete the category");
    }

    navigate("/categories");
    toast.success(`${category.name} has been deleted`);
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

export default CategoryDeleteForm;
