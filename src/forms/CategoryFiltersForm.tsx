import { useSearchParams } from "react-router-dom";
import { IconClearAll, IconFilter, IconSearch } from "@tabler/icons-react";
import React from "react";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import RadioGroup from "../components/form/RadioButton/RadioGroup";

type CategoryFiltersFormProps = {
  refetch: () => void;
};

const CategoryFiltersForm: React.FC<CategoryFiltersFormProps> = ({
  refetch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (data: FormData) => {
    const q = data.get("q") as string;
    const [order, dir] = (data.get("sort") as string).split(":");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", q);
    newParams.set("order", order);
    newParams.set("dir", dir);
    setSearchParams(newParams, { replace: true });
    setTimeout(refetch, 0);
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
    setTimeout(refetch, 0);
  };

  return (
    <Form handle={handleSubmit} reset={handleReset}>
      <FormSection legend="Search">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            name="q"
            className="flex-1"
            defaultValue={searchParams.get("q") || ""}
            placeholder="Search Categories"
            iconLeft={IconSearch}
          />

          <Button type="submit" color="primary" iconLeft={IconFilter}>
            Filter
          </Button>
        </div>
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

      <Button
        type="reset"
        variant="outline"
        color="danger"
        iconLeft={IconClearAll}
        className="w-full"
      >
        Clear Filters
      </Button>
    </Form>
  );
};

export default CategoryFiltersForm;
