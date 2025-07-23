import { useNavigate, useParams } from "@solidjs/router";
import { Component, createResource, Show } from "solid-js";
import Button from "../../../../../components/form/Button";
import Form from "../../../../../components/form/Form";
import Input from "../../../../../components/form/Input";
import Container from "../../../../../components/layout/Container";
import H1 from "../../../../../components/typography/H1";
import {
  getCategory,
  patchCategoryUpdate,
} from "../../../../../services/categories";

const CategoryEditPage: Component = () => {
  const slug = useParams()["slug"];
  const navigate = useNavigate();

  const [category] = createResource(async () => {
    const result = await getCategory(slug);
    if (!result.success) throw navigate("/categories");
    return result.data;
  });

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const spot = data.get("spot") as string;
    const description = data.get("description") as string;

    const response = await patchCategoryUpdate(slug, name, spot, description);

    await Promise.resolve(() => setTimeout(() => {}, 4000));

    if (!response.success) return;

    navigate("/categories");
  };

  return (
    <Show when={category()}>
      <Container size="sm">
        <H1>Edit Category</H1>

        <Form handle={handleSubmit}>
          <Input name="name" label="Name" value={category().name} required />

          <Input
            name="spot"
            label="Spot"
            required
            value={category().spot}
            minlength={20}
            maxlength={75}
          />

          <Input
            name="description"
            label="Description"
            required
            value={category().description}
            minlength={70}
            maxlength={155}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </Show>
  );
};

export default CategoryEditPage;
