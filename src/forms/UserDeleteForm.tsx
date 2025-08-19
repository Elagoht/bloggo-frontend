import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import FormSection from "../components/form/FormSection";
import HoldButton from "../components/form/HoldButton";
import PermissionGuard from "../components/Guards/PermissionGuard";
import { deleteUser } from "../services/users";

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
    <PermissionGuard permission={["user:delete"]}>
      <FormSection
        color="danger"
        legend="Caution! This action cannot be reversed."
      >
        <HoldButton color="danger" onClick={handleSubmit}>
          Hold to Delete
        </HoldButton>
      </FormSection>
    </PermissionGuard>
  );
};

export default UserDeleteForm;
