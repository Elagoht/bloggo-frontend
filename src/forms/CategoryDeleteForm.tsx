import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import { deleteCategory } from "../services/categories";

type CategoryDeleteFormProps = {
  category: ResponseCategory;
  children?: React.ReactNode;
};

const CategoryDeleteForm: React.FC<CategoryDeleteFormProps> = ({
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
      <HoldButton color="danger" onClick={handleSubmit}>
        Hold to Delete
      </HoldButton>
    </FormSection>
  );
};

export default CategoryDeleteForm;
