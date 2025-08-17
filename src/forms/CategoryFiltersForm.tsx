import { useSearchParams } from "@solidjs/router";
import { IconClearAll, IconFilter } from "@tabler/icons-solidjs";
import { Component } from "solid-js";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import RadioGroup from "../components/form/RadioButton/RadioGroup";
import Fieldset from "../components/layout/Container/Fieldset";

type CategoryFiltersFormProps = {
  refetch: () => void;
};

const CategoryFiltersForm: Component<CategoryFiltersFormProps> = ({
  refetch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (data: FormData) => {
    const q = data.get("q") as string;
    const [order, dir] = (data.get("sort") as string).split(":");

    setSearchParams({ q, order, dir }, { replace: true });
    queueMicrotask(refetch);
  };

  const handleReset = (form: HTMLFormElement) => {
    const nameInput = form.querySelector("[name=q]") as HTMLInputElement;
    const sortInput = form.querySelector(
      "[value='name:desc']"
    ) as HTMLInputElement;
    sortInput.checked = true;
    nameInput.value = "";
    setSearchParams({ q: "", order: "", dir: "" }, { replace: true });
    queueMicrotask(refetch);
  };

  return (
    <Form handle={handleSubmit} reset={handleReset}>
      <div class="flex items-center gap-1">
        <Input
          type="search"
          name="q"
          class="grow"
          value={searchParams.q || ""}
          placeholder="Search Categories"
        />

        <Button type="submit" iconLeft={IconFilter} />
      </div>

      <Fieldset legend="Sort By">
        <RadioGroup
          name="sort"
          checked={
            searchParams.order && searchParams.dir
              ? `${searchParams.order}:${searchParams.dir}`
              : "name:desc"
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
      </Fieldset>

      <Button type="reset" variant="outline" iconLeft={IconClearAll}>
        Clear Filters
      </Button>
    </Form>
  );
};

export default CategoryFiltersForm;
