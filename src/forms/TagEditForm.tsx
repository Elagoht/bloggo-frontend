import {
  IconDeviceFloppy,
  IconTag,
  IconX,
} from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import { patchTagUpdate } from "../services/tags";

type TagEditFormProps = {
  tag: ResponseTag;
  children?: ReactNode;
};

const TagEditForm: FC<TagEditFormProps> = ({ tag }) => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;

    const response = await patchTagUpdate(tag.slug, name);

    if (!response.success) return;

    navigate("/tags");
  };

  return (
    <Form handle={handleSubmit}>
      <FormSection legend="Tag Information">
        <Input
          name="name"
          label="Tag Name"
          iconLeft={IconTag}
          placeholder="e.g., JavaScript, Travel, Photography"
          defaultValue={tag.name}
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
          Save Changes
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
  );
};

export default TagEditForm;