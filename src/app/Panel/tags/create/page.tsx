import { useNavigate } from "react-router-dom";
import {
  IconTag,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import Button from "../../../../components/form/Button";
import ButtonGroup from "../../../../components/form/ButtonGroup";
import Form from "../../../../components/form/Form";
import FormSection from "../../../../components/form/FormSection";
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
            <FormSection legend="Tag Information">
              <Input
                name="name"
                label="Tag Name"
                iconLeft={IconTag}
                placeholder="e.g., JavaScript, Travel, Photography"
                required
              />
            </FormSection>

            <ButtonGroup>
              <Button
                type="submit"
                color="success"
                className="flex-1"
                iconRight={IconDeviceFloppy}
              >
                Create Tag
              </Button>

              <Button
                color="danger"
                variant="outline"
                href="/tags"
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