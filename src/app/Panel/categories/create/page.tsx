import { useNavigate } from "@solidjs/router";
import {
  IconCategory,
  IconFileDescription,
  IconFlame,
  IconTag,
  IconCheck,
  IconX,
  IconDownload,
  IconUpload,
} from "@tabler/icons-solidjs";
import { Component } from "solid-js";
import Button from "../../../../components/form/Button";
import ButtonGroup from "../../../../components/form/ButtonGroup";
import Form from "../../../../components/form/Form";
import FormSection from "../../../../components/form/FormSection";
import Input from "../../../../components/form/Input";
import Textarea from "../../../../components/form/Textarea";
import Container from "../../../../components/layout/Container";
import FormCard from "../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import { postCategoryCreate } from "../../../../services/categories";

const CategoryCreatePage: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const spot = data.get("spot") as string;
    const description = data.get("description") as string;

    const response = await postCategoryCreate(name, spot, description);

    if (!response.success) return;

    navigate("/categories");
  };

  return (
    <Container size="sm">
      <PageTitleWithIcon icon={IconCategory}>Create Category</PageTitleWithIcon>

      <FormCard>
        <Form handle={handleSubmit}>
          <FormSection legend="Display Content">
            <Input
              name="name"
              label="Category Name"
              iconLeft={IconTag}
              placeholder="e.g., Technology, Travel, Food"
              required
            />

            <Input
              name="spot"
              label="Spot Text"
              iconLeft={IconFlame}
              placeholder="A compelling 20-75 character description"
              required
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
              iconRight={IconUpload}
            >
              Create Category
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
      </FormCard>
    </Container>
  );
};

export default CategoryCreatePage;
