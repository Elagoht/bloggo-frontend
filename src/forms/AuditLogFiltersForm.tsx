import { IconClearAll, IconFilter } from "@tabler/icons-react";
import qs from "qs";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/form/Button";
import ButtonGroup from "../components/form/ButtonGroup";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import MultiSelectActions from "../components/form/MultiSelectActions";
import MultiSelectTags from "../components/form/MultiSelectTags";
import RadioGroup from "../components/form/RadioButton/RadioGroup";

interface AuditLogFiltersFormProps {
  users?: Map<number, UserCard>;
  categories?: CategoryCard[];
  tags?: TagCard[];
}

interface QueryParams {
  order: string;
  dir: string;
  page: number;
  take: number;
  userId?: string[];
  entityType?: string[];
  action?: string[];
  categories?: string[];
  tags?: string[];
}

const AuditLogFiltersForm: FC<AuditLogFiltersFormProps> = ({
  users,
  categories,
  tags,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // State for multi-select filters
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from URL parameters
  useEffect(() => {
    const parseArrayParam = (paramName: string): string[] => {
      const param = searchParams.get(paramName);
      return param ? param.split(",").filter(Boolean) : [];
    };

    setSelectedUsers(parseArrayParam("userId"));
    setSelectedEntityTypes(parseArrayParam("entityType"));
    setSelectedActions(parseArrayParam("action"));
    setSelectedCategories(parseArrayParam("categories"));
    setSelectedTags(parseArrayParam("tags"));
    setIsInitialized(true);
  }, [searchParams]);

  const entityTypes: { value: AuditEntityType; label: string }[] = [
    { value: "auth", label: "Authentication" },
    { value: "user", label: "User" },
    { value: "post", label: "Post" },
    { value: "post_version", label: "Post Version" },
    { value: "category", label: "Category" },
    { value: "tag", label: "Tag" },
    { value: "removal_request", label: "Removal Request" },
  ];

  const actionTypes: { value: AuditActionType; label: string }[] = [
    // Basic CRUD actions
    { value: "created", label: "Created" },
    { value: "updated", label: "Updated" },
    { value: "deleted", label: "Deleted" },

    // Workflow actions
    { value: "submitted", label: "Submitted" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "published", label: "Published" },
    { value: "unpublished", label: "Unpublished" },

    // Special actions
    { value: "assigned", label: "Assigned" },
    { value: "removed", label: "Removed" },
    { value: "requested", label: "Requested" },
    { value: "denied", label: "Denied" },
    { value: "added", label: "Added" },
    { value: "login", label: "Login" },
    { value: "logout", label: "Logout" },
  ];

  // Create options arrays for checkboxes
  const userOptions = users
    ? Array.from(users.entries()).map(([id, user]) => ({
        value: id.toString(),
        label: user.name,
      }))
    : [];

  const entityTypeOptions = entityTypes.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  const actionOptions = actionTypes.map((action) => ({
    value: action.value,
    label: action.label,
  }));

  const categoryOptions = categories
    ? categories.map((category) => ({
        value: category.slug,
        label: category.name,
      }))
    : [];

  const tagOptions = tags
    ? tags.map((tag) => ({
        value: tag.slug,
        label: tag.name,
      }))
    : [];

  useEffect(() => {
    if (isInitialized) {
      const queryParams: QueryParams = {
        order: searchParams.get("order") || "created_at",
        dir: searchParams.get("dir") || "desc",
        page: 1,
        take: 20,
      };

      if (selectedUsers.length > 0) queryParams.userId = selectedUsers;
      if (selectedEntityTypes.length > 0)
        queryParams.entityType = selectedEntityTypes;
      if (selectedActions.length > 0) queryParams.action = selectedActions;
      if (selectedCategories.length > 0)
        queryParams.categories = selectedCategories;
      if (selectedTags.length > 0) queryParams.tags = selectedTags;

      const queryString = qs.stringify(queryParams, {
        arrayFormat: "comma",
        encode: true,
      });

      navigate(`${location.pathname}?${queryString}`, { replace: true });
    }
  }, [
    selectedUsers,
    selectedEntityTypes,
    selectedActions,
    selectedCategories,
    selectedTags,
    isInitialized,
    navigate,
    location.pathname,
    searchParams,
  ]);

  const handleSubmit = async (data: FormData) => {
    const [order, dir] = (data.get("sort") as string).split(":");

    const queryParams: QueryParams = {
      order,
      dir,
      page: 1,
      take: 20,
    };

    // Add filters only if they have values - pass arrays directly to qs
    if (selectedUsers.length > 0) {
      queryParams.userId = selectedUsers;
    }

    if (selectedEntityTypes.length > 0) {
      queryParams.entityType = selectedEntityTypes;
    }

    if (selectedActions.length > 0) {
      queryParams.action = selectedActions;
    }

    if (selectedCategories.length > 0) {
      queryParams.categories = selectedCategories;
    }

    if (selectedTags.length > 0) {
      queryParams.tags = selectedTags;
    }

    const queryString = qs.stringify(queryParams, {
      arrayFormat: "comma",
      encode: true,
    });
    navigate(`${location.pathname}?${queryString}`, { replace: true });
  };

  const handleReset = (form: HTMLFormElement) => {
    // Clear all selections
    setSelectedUsers([]);
    setSelectedEntityTypes([]);
    setSelectedActions([]);
    setSelectedCategories([]);
    setSelectedTags([]);

    // Reset sort option
    const sortInput = form.querySelector(
      "[value='created_at:desc']"
    ) as HTMLInputElement;
    if (sortInput) sortInput.checked = true;

    const newParams = new URLSearchParams();
    setSearchParams(newParams, { replace: true });
  };

  return (
    <Form handle={handleSubmit} reset={handleReset}>
      <FormSection legend="Users">
        <MultiSelectTags
          values={selectedUsers}
          onChange={setSelectedUsers}
          options={userOptions}
        />
      </FormSection>

      <FormSection legend="Entity Types">
        <MultiSelectTags
          values={selectedEntityTypes}
          onChange={setSelectedEntityTypes}
          options={entityTypeOptions}
        />
      </FormSection>

      <FormSection legend="Actions">
        <MultiSelectActions
          values={selectedActions}
          onChange={setSelectedActions}
          options={actionOptions}
        />
      </FormSection>

      <FormSection legend="Categories">
        <MultiSelectTags
          values={selectedCategories}
          onChange={setSelectedCategories}
          options={categoryOptions}
        />
      </FormSection>

      <FormSection legend="Tags">
        <MultiSelectTags
          values={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
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
            { value: "created_at:asc", label: "First Created" },
            { value: "created_at:desc", label: "Last Created" },
            { value: "user_id:asc", label: "User A-Z" },
            { value: "user_id:desc", label: "User Z-A" },
            { value: "entity_type:asc", label: "Entity Type A-Z" },
            { value: "entity_type:desc", label: "Entity Type Z-A" },
            { value: "action:asc", label: "Action A-Z" },
            { value: "action:desc", label: "Action Z-A" },
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

export default AuditLogFiltersForm;
