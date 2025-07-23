import { Component, createResource, Show } from "solid-js";
import Container from "../../../../../components/layout/Container";
import H1 from "../../../../../components/typographu/H1";
import { useNavigate, useParams } from "@solidjs/router";
import { getCategories, getCategory } from "../../../../../services/categories";
import Input from "../../../../../components/form/Input";
import Button from "../../../../../components/form/button";

const CategoryEditPage: Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [category] = createResource(async () => {
    const result = await getCategory(params["slug"]);
    if (!result.success) throw navigate("/categories");
    return result.data;
  });

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    console.log(formData);
  };

  return (
    <Show when={category()}>
      <Container size="sm">
        <H1>Edit Category</H1>

        <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
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
        </form>
      </Container>
    </Show>
  );
};

export default CategoryEditPage;
