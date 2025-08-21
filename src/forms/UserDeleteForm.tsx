import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { deleteUser } from "../services/users";
import FormCard from "../components/layout/Container/FormCard";
import SectionHeader from "../components/layout/SectionHeader";
import { IconTrash } from "@tabler/icons-react";

interface UserDeleteFormProps {
  user: ResponseUserDetails;
}

const UserDeleteForm: React.FC<UserDeleteFormProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await deleteUser(user.id);

    if (!response.success) {
      return toast.error("Couldn't delete the user");
    }

    navigate("/users");
    toast.success(`${user.name} has been deleted`);
  };

  return (
    <FormCard color="danger">
      <SectionHeader icon={IconTrash} color="danger">
        Danger Zone
      </SectionHeader>

      <HoldButton color="danger" onClick={handleSubmit}>
        Hold to Delete
      </HoldButton>
    </FormCard>
  );
};

export default UserDeleteForm;
