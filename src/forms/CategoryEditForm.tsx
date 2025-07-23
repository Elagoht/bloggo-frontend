import { useNavigate, useParams } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import { patchCategoryUpdate } from "../services/categories";

type CategoryEditFormProps = {
  category: ResponseCategory;
};

const CategoryEditForm: ParentComponent<CategoryEditFormProps> = ({
  category,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const spot = data.get("spot") as string;
    const description = data.get("description") as string;

    const response = await patchCategoryUpdate(
      category.slug,
      name,
      spot,
      description
    );

    if (!response.success) return;

    navigate("/categories");
  };

  return (
    <Form handle={handleSubmit}>
      <FormSection legend="Content">
        <Input name="name" label="Name" value={category.name} required />

        <Input
          name="spot"
          label="Spot"
          required
          value={category.spot}
          minlength={20}
          maxlength={75}
        />
      </FormSection>

      <FormSection legend="SEO Metadata">
        <Input
          name="description"
          label="Description"
          required
          value={category.description}
          minlength={70}
          maxlength={155}
        />
      </FormSection>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CategoryEditForm;
