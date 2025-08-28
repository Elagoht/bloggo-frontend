import { IconDeviceFloppy, IconTag, IconX } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/form/Button";
import ButtonGroup from "../../../../components/form/ButtonGroup";
import Form from "../../../../components/form/Form";
import Input from "../../../../components/form/Input";
import RouteGuard from "../../../../components/Guards/RouteGuard";
import Container from "../../../../components/layout/Container";
import FormCard from "../../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../../components/layout/Container/PageTitle";
import { postTagCreate } from "../../../../services/tags";

const TagCreatePage: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;

    const response = await postTagCreate(name);

    if (!response.success) return;

    navigate("/tags");
  };

  return (
    <RouteGuard permission="tag:create" redirectTo="/tags">
      <Container size="sm">
        <PageTitleWithIcon icon={IconTag}>Create Tag</PageTitleWithIcon>

        <FormCard color="default">
          <Form handle={handleSubmit}>
            <Input
              autoFocus
              name="name"
              label="Tag Name"
              iconLeft={IconTag}
              placeholder="e.g., JavaScript, Travel, Photography"
              required
            />

            <ButtonGroup>
              <Button
                type="submit"
                color="success"
                className="flex-1"
                shortcutKey="Enter"
                iconRight={IconDeviceFloppy}
              >
                Create Tag
              </Button>

              <Button
                color="danger"
                variant="outline"
                href="/tags"
                shortcutKey="Escape"
                iconLeft={IconX}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Container>
    </RouteGuard>
  );
};

export default TagCreatePage;
