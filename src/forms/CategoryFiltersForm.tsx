import { IconClearAll, IconFilter, IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import RadioGroup from "../components/form/RadioButton/RadioGroup";
import ButtonGroup from "../components/form/ButtonGroup";

type CategoryFiltersFormProps = {};

const CategoryFiltersForm: FC<CategoryFiltersFormProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (data: FormData) => {
    const q = data.get("q") as string;
    const [order, dir] = (data.get("sort") as string).split(":");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", q);
    newParams.set("order", order);
    newParams.set("dir", dir);
    setSearchParams(newParams, { replace: true });
    // No need to call refetch - parent useEffect will trigger automatically
  };

  const handleReset = (form: HTMLFormElement) => {
    const nameInput = form.querySelector("[name=q]") as HTMLInputElement;
    const sortInput = form.querySelector(
      "[value='name:asc']"
    ) as HTMLInputElement;
    if (sortInput) sortInput.checked = true;
    if (nameInput) nameInput.value = "";
    const newParams = new URLSearchParams();
    setSearchParams(newParams, { replace: true });
  };

  return (
    <Form handle={handleSubmit} reset={handleReset}>
      <FormSection legend="Search">
        <Input
          autoFocus
          type="search"
          name="q"
          className="flex-1"
          defaultValue={searchParams.get("q") || ""}
          placeholder="Search Categories"
          iconLeft={IconSearch}
        />
      </FormSection>

      <FormSection legend="Sort By">
        <RadioGroup
          name="sort"
          checked={
            searchParams.get("order") && searchParams.get("dir")
              ? `${searchParams.get("order")}:${searchParams.get("dir")}`
              : "name:asc"
          }
          options={[
            { value: "name:asc", label: "Name A-Z" },
            { value: "name:desc", label: "Name Z-A" },
            { value: "created_at:asc", label: "First Created" },
            { value: "created_at:desc", label: "Last Created" },
            { value: "updated_at:asc", label: "First Updated" },
            { value: "updated_at:desc", label: "Last Updated" },
          ]}
        />
      </FormSection>

      <ButtonGroup>
        <Button
          type="submit"
          color="primary"
          iconLeft={IconFilter}
          shortcutKey="Enter"
          className="flex-1"
        >
          Search
        </Button>

        <Button
          type="reset"
          variant="outline"
          color="danger"
          iconLeft={IconClearAll}
          shortcutKey="Escape"
        >
          Clear
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default CategoryFiltersForm;
