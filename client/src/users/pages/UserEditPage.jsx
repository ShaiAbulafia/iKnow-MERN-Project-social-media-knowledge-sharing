import { useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/joi-schema/signupSchema";
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";
import { useNavigate, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import UserForm from "../components/UserForm";
import { useTheme } from "../../providers/ThemeProvider";
import PageHeader from "../../components/PageHeader";

const UserEditPage = () => {
  const { isDark } = useTheme();
  const { handleUpdateUser, handleGetUser } = useUsers();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const { value, ...rest } = useForm(initialSignupForm, signupSchema, () =>
    handleUpdateUser(user._id, normalizeUser({ ...value.data }))
  );
  useEffect(() => {
    handleGetUser(id).then((data) => {
      if (!data) return null;
      if (user && user._id !== data._id) navigate(ROUTES.POSTS);
      const modeledUser = mapUserToModel(data);
      rest.setData(modeledUser);
    });
  }, []);

  if (!user) return null;
  return (
    <Container
      sx={{
        pt: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 20,
        }}
      >
        <UserForm
          title="Edit user"
          data={value.data}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          onReset={rest.handleReset}
          onSubmit={rest.onSubmit}
          setData={rest.setData}
        />
      </Paper>
    </Container>
  );
};

export default UserEditPage;
