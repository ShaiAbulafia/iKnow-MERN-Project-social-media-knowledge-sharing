import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import UsersTable from "./UsersTable";
import userType from "../models/types/userType";

const UsersFeedback = ({ isLoading, error, users, onDelete }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (users) return <UsersTable users={users} onDelete={onDelete} />;
  return null;
};

UsersFeedback.propTypes = {
  users: arrayOf(userType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
};

export default UsersFeedback;
