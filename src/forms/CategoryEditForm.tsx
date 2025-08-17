import { useNavigate } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import {
  IconTag,
  IconFlame,
  IconFileDescription,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-solidjs";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
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
      <FormSection legend="Display Content">
        <Input
          name="name"
          label="Category Name"
          iconLeft={IconTag}
          placeholder="e.g., Technology, Travel, Food"
          value={category.name}
          required
        />

        <Input
          name="spot"
          label="Spot Text"
          iconLeft={IconFlame}
          placeholder="A compelling 20-75 character description"
          required
          value={category.spot}
          minlength={20}
          maxlength={75}
        />
      </FormSection>

      <FormSection legend="SEO Metadata">
        <Textarea
          name="description"
          label="Description"
          iconLeft={IconFileDescription}
          placeholder="A detailed description for search engines and category pages. This should be comprehensive and informative, explaining what this category covers."
          required
          value={category.description}
          minlength={70}
          maxlength={500}
          rows={4}
        />
      </FormSection>

      <ButtonGroup layout="flex-row" alignment="start" gap="md" fullWidth>
        <Button
          type="submit"
          color="success"
          class="flex-1"
          iconRight={IconDeviceFloppy}
        >
          Save Changes
        </Button>

        <Button
          color="danger"
          variant="outline"
          href="/categories"
          iconLeft={IconX}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default CategoryEditForm;
