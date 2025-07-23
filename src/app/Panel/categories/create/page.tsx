import { Component } from "solid-js";
import Container from "../../../../components/layout/Container";
import Input from "../../../../components/form/Input";
import Button from "../../../../components/form/button";
import { postCategoryCreate } from "../../../../services/categories";
import { useNavigate } from "@solidjs/router";
import H1 from "../../../../components/typographu/H1";

const CategoryCreatePage: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);

    const name = formData.get("name") as string;
    const spot = formData.get("spot") as string;
    const description = formData.get("description") as string;

    const response = await postCategoryCreate(name, spot, description);

    if (!response.success) return;

    navigate("/categories");
  };

  return (
    <Container size="sm">
      <H1>Create Category</H1>

      <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
        <Input name="name" label="Name" required />

        <Input
          name="spot"
          label="Spot"
          required
          minlength={20}
          maxlength={75}
        />

        <Input
          name="description"
          label="Description"
          required
          minlength={70}
          maxlength={155}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default CategoryCreatePage;
