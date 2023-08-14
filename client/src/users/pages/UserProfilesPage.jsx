import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import useUsers from "../hooks/useUsers";
import UserProfileFeedback from "../components/UserProfileFeedback";
import { Box } from "@mui/material";

const UserProfilesPage = () => {
  const { id } = useParams();
  const { value, ...rest } = useUsers();

  useEffect(() => {
    rest.handleViewUser(id);
  }, []);

  useEffect(() => {
    rest.handleViewUser(id);
  }, [id]);

  return (
    <Box pt={3}>
      <UserProfileFeedback
        user={value.curUser}
        isLoading={value.isLoading}
        error={value.error}
      />
    </Box>
  );
};

export default UserProfilesPage;
