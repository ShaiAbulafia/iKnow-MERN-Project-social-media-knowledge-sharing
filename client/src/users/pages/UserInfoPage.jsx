import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import useUsers from "../hooks/useUsers";
import UserInfoFeedback from "../components/UserInfoFeedback";
import { useUser } from "../providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box } from "@mui/material";

const UserInfoPage = () => {
  const { id } = useParams();
  const { value, ...rest } = useUsers();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    rest.handleUserInfo(id).then((data) => {
      if (!data) return null;
      if (user && !user.isAdmin && user._id !== data._id) {
        navigate(ROUTES.POSTS);
      }
    });
  }, []);

  if (!user) return null;
  return (
    <Box pt={3}>
      <UserInfoFeedback
        user={value.curUser}
        isLoading={value.isLoading}
        error={value.error}
      />
    </Box>
  );
};

export default UserInfoPage;
