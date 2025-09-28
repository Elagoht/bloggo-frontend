import { IconClearAll, IconFilter, IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Input from "../components/form/Input";
import RadioGroup from "../components/form/RadioButton/RadioGroup";
import Select from "../components/form/Select";
import ButtonGroup from "../components/form/ButtonGroup";
import { REMOVAL_REQUEST_STATUS } from "../services/removal-requests";

const RemovalRequestFiltersForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (data: FormData) => {
    const q = data.get("q") as string;
    const status = data.get("status") as string;
    const [order, dir] = (data.get("sort") as string).split(":");

    const newParams = new URLSearchParams(searchParams);
    if (q) {
      newParams.set("q", q);
    } else {
      newParams.delete("q");
    }
    if (status && status !== "all") {
      newParams.set("status", status);
    } else {
      newParams.delete("status");
    }
    newParams.set("order", order);
    newParams.set("dir", dir);
    setSearchParams(newParams, { replace: true });
  };

  const handleReset = (form: HTMLFormElement) => {
    const qInput = form.querySelector("[name=q]") as HTMLInputElement;
    const statusSelect = form.querySelector("[name=status]") as HTMLSelectElement;
    const sortInput = form.querySelector(
      "[value='created_at:desc']"
    ) as HTMLInputElement;

    if (qInput) qInput.value = "";
    if (statusSelect) statusSelect.value = "all";
    if (sortInput) sortInput.checked = true;

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
          placeholder="Search by title, writer, or reason..."
          iconLeft={IconSearch}
        />
      </FormSection>

      <FormSection legend="Status">
        <Select
          name="status"
          defaultValue={searchParams.get("status") || "all"}
          options={[
            { value: "all", label: "All Statuses" },
            {
              value: REMOVAL_REQUEST_STATUS.PENDING.toString(),
              label: "Pending",
            },
            {
              value: REMOVAL_REQUEST_STATUS.APPROVED.toString(),
              label: "Approved",
            },
            {
              value: REMOVAL_REQUEST_STATUS.REJECTED.toString(),
              label: "Rejected",
            },
          ]}
        />
      </FormSection>

      <FormSection legend="Sort By">
        <RadioGroup
          name="sort"
          checked={
            searchParams.get("order") && searchParams.get("dir")
              ? `${searchParams.get("order")}:${searchParams.get("dir")}`
              : "created_at:desc"
          }
          options={[
            { value: "created_at:desc", label: "Newest First" },
            { value: "created_at:asc", label: "Oldest First" },
            { value: "post_title:asc", label: "Post Title A-Z" },
            { value: "post_title:desc", label: "Post Title Z-A" },
            { value: "requested_by_name:asc", label: "Requester A-Z" },
            { value: "requested_by_name:desc", label: "Requester Z-A" },
            { value: "status:asc", label: "Status (Pending First)" },
            { value: "status:desc", label: "Status (Decided First)" },
            { value: "decided_at:desc", label: "Recently Decided" },
            { value: "decided_at:asc", label: "First Decided" },
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
          Filter
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

export default RemovalRequestFiltersForm;