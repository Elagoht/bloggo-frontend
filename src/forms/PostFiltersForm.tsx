import {
  IconCategory,
  IconClearAll,
  IconFilter,
  IconProgressCheck,
  IconSearch,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import RadioGroup from "../components/form/RadioButton/RadioGroup";
import Select from "../components/form/Select";
import { getCategoriesList } from "../services/categories";
import ButtonGroup from "../components/form/ButtonGroup";

const PostFiltersForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategoriesList();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        // Handle error silently
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (data: FormData) => {
    const q = data.get("q") as string;
    const status = data.get("status") as string;
    const categoryId = data.get("categoryId") as string;
    const [order, dir] = (data.get("sort") as string).split(":");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", q);
    newParams.set("order", order);
    newParams.set("dir", dir);

    if (status) {
      newParams.set("status", status);
    } else {
      newParams.delete("status");
    }

    if (categoryId) {
      newParams.set("categoryId", categoryId);
    } else {
      newParams.delete("categoryId");
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleReset = (form: HTMLFormElement) => {
    const nameInput = form.querySelector("[name=q]") as HTMLInputElement;
    const statusSelect = form.querySelector(
      "[name=status]"
    ) as HTMLSelectElement;
    const categorySelect = form.querySelector(
      "[name=categoryId]"
    ) as HTMLSelectElement;
    const sortInput = form.querySelector(
      "[value='updated_at:desc']"
    ) as HTMLInputElement;

    if (sortInput) sortInput.checked = true;
    if (nameInput) nameInput.value = "";
    if (statusSelect) statusSelect.value = "";
    if (categorySelect) categorySelect.value = "";

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
          placeholder="Search Posts"
          iconLeft={IconSearch}
        />
      </FormSection>

      <FormSection legend="Status">
        <Select
          icon={IconProgressCheck}
          name="status"
          defaultValue={searchParams.get("status") || ""}
          options={[
            { value: "", label: "All Statuses" },
            { value: "0", label: "Draft" },
            { value: "1", label: "Pending" },
            { value: "2", label: "Approved" },
            { value: "3", label: "Rejected" },
            { value: "4", label: "Scheduled" },
            { value: "5", label: "Published" },
          ]}
        />
      </FormSection>

      <FormSection legend="Category">
        <Select
          icon={IconCategory}
          name="categoryId"
          defaultValue={searchParams.get("categoryId") || ""}
          options={[
            { value: "", label: "All Categories" },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />
      </FormSection>

      <FormSection legend="Sort By">
        <RadioGroup
          name="sort"
          checked={
            searchParams.get("order") && searchParams.get("dir")
              ? `${searchParams.get("order")}:${searchParams.get("dir")}`
              : "updated_at:desc"
          }
          options={[
            { value: "title:asc", label: "Title A-Z" },
            { value: "title:desc", label: "Title Z-A" },
            { value: "created_at:asc", label: "First Created" },
            { value: "created_at:desc", label: "Last Created" },
            { value: "updated_at:asc", label: "First Updated" },
            { value: "updated_at:desc", label: "Last Updated" },
            { value: "read_count:asc", label: "Least Read" },
            { value: "read_count:desc", label: "Most Read" },
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

export default PostFiltersForm;
