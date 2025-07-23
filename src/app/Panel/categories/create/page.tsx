import { Component } from "solid-js";
import Container from "../../../../components/layout/Container";
import Input from "../../../../components/form/Input";
import Button from "../../../../components/form/Button";
import { postCategoryCreate } from "../../../../services/categories";
import { useNavigate } from "@solidjs/router";
import H1 from "../../../../components/typography/H1";
import Form from "../../../../components/form/Form";

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
      <H1>Create Category</H1>

      <Form handle={handleSubmit}>
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
      </Form>
    </Container>
  );
};

export default CategoryCreatePage;
