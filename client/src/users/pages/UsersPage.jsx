import { useCallback, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import UsersFeedback from "../components/UsersFeedback";
import useUsers from "../hooks/useUsers";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useUser } from "../providers/UserProvider";

const UsersPage = () => {
  const { user } = useUser();
  const { value, handleGetUsers, handleDeleteUser } = useUsers();

  useEffect(() => {
    handleGetUsers();
  }, []);

  const onDeleteUser = useCallback(
    async (userId) => {
      await handleDeleteUser(userId);
      handleGetUsers();
    },
    [handleDeleteUser, handleGetUsers]
  );

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />;
  if (!user.isAdmin) return <Navigate replace to={ROUTES.POSTS} />;
  return (
    <Box pt={10}>
      <UsersFeedback
        isLoading={value.isLoading}
        users={value.filteredUsers}
        error={value.error}
        onDelete={onDeleteUser}
      />
    </Box>
  );
};

export default UsersPage;
