import React, { useEffect, useState } from "react";
import { IconShield, IconDeviceFloppy } from "@tabler/icons-react";
import toast from "react-hot-toast";
import Button from "../components/form/Button";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection";
import Select from "../components/form/Select";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { patchUserAssignRole } from "../services/users";
import { getRoles } from "../services/roles";
import FormCard from "../components/layout/Container/FormCard";

interface UserRoleAssignFormProps {
  user: ResponseUserDetails;
  onUpdate?: () => void;
}

const UserRoleAssignForm: React.FC<UserRoleAssignFormProps> = ({
  user,
  onUpdate,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await getRoles();
        if (response.success) {
          setRoles(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (data: FormData) => {
    const roleId = parseInt(data.get("roleId") as string);

    const response = await patchUserAssignRole(user.id, { roleId });

    if (response.success) {
      toast.success("User role updated successfully!");
      onUpdate?.();
    } else {
      toast.error(response.error?.message || "Failed to update user role");
    }
  };

  const roleOptions = roles.map((role) => ({
    value: role.id.toString(),
    label: role.name,
  }));

  return (
    <FormCard>
      <Form handle={handleSubmit}>
        <FormSection legend="Role Assignment">
          <Select
            name="roleId"
            label="User Role"
            iconLeft={IconShield}
            options={roleOptions}
            defaultValue={user.roleId.toString()}
            disabled={loading}
            required
          />
        </FormSection>

        <Button
          type="submit"
          color="primary"
          iconRight={IconDeviceFloppy}
          disabled={loading}
        >
          Update Role
        </Button>
      </Form>
    </FormCard>
  );
};

export default UserRoleAssignForm;
