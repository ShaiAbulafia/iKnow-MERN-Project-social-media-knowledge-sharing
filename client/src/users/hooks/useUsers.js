import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useUser } from "../providers/UserProvider";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import {
  login,
  signup,
  getTheUser,
  updateUser,
  getUsers,
  deleteUser,
  changeUserBlock,
  getViewUser,
  updateUserContact,
  getDisplayUser,
  getDisplayUsers,
  updateUserKpoints,
  updateUserPassword,
  followUser,
} from "../services/userApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import { useSearchParams } from "react-router-dom";

const useUsers = () => {
  const { user, setUser, setToken } = useUser();
  const [curUser, setCurUser] = useState();
  const [users, setUsers] = useState(null);
  const [usersDisplay, setUsersDisplay] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilter] = useState(null);
  const [searchParamas] = useSearchParams();
  const [attempt, setAttempt] = useState(1);

  useAxios();
  const snack = useSnack();
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParamas.get("u") ?? "");
  }, [searchParamas]);

  useEffect(() => {
    if (users) {
      setFilter(
        users.filter(
          (user) =>
            user.email.includes(query) ||
            user.name.first.includes(query) ||
            user.name.last.includes(query) ||
            user._id.includes(query)
        )
      );
    }
  }, [users, query]);

  const requestStatus = useCallback(
    (loading, errorMessages, users, user = null) => {
      setLoading(loading);
      setError(errorMessages);
      setUsers(users);
      setUser(user);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user) => {
      try {
        setLoading(true);
        user = { ...user, attempt: attempt };
        setAttempt((prev) => prev + 1);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        snack("success", "Logged in");
        requestStatus(false, null, null, userFromLocalStorage);
        navigate(ROUTES.ROOT);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [attempt, navigate, requestStatus, setToken, snack]
  );

  const handleLogout = useCallback(() => {
    setLoading(true);
    removeToken();
    requestStatus(false, null, null);
    snack("success", "Logged out");
    navigate(`${ROUTES.POSTS}/all_posts`);
  }, [navigate, requestStatus, snack]);

  const handleSignup = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
        snack("success", "Signup successfully");
        navigate(ROUTES.ROOT);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [handleLogin, navigate, requestStatus, snack]
  );

  const handleGetUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const user = await getTheUser(userId);
        requestStatus(false, null, null, user);
        return user;
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus]
  );

  const handleUserInfo = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const viewUser = await getTheUser(userId);
        setCurUser(viewUser);
        setLoading(false);
        setError(null);
        setUsers(null);
        return user;
      } catch (error) {
        snack("error", error.message);
        requestStatus(false, error.message, null, user);
      }
    },
    [requestStatus, snack, user]
  );

  const handleViewUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const viewUser = await getViewUser(userId);
        setCurUser(viewUser);
        setLoading(false);
        setError(null);
        setUsers(null);
        return user;
      } catch (error) {
        snack("error", error.message);
        requestStatus(false, error.message, null, user);
      }
    },
    [requestStatus, snack, user]
  );

  const handleUpdateUser = useCallback(
    async (userId, normalizedUser) => {
      try {
        setLoading(true);
        const user = await updateUser(userId, normalizedUser);
        requestStatus(false, null, null, user);
        snack("success", "Updated user successfully");
        navigate(`${ROUTES.USER_PROFILE}/view/${userId}`);
        return user;
      } catch (error) {
        requestStatus(false, error.message, null, user);
      }
    },
    [navigate, requestStatus, snack, user]
  );

  const handleChangePass = useCallback(
    async (userInfo) => {
      try {
        await updateUserPassword(userInfo);
        snack("success", "Password changed");
        navigate(ROUTES.LOGIN);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [navigate, snack, requestStatus]
  );

  const handleUpdateUserContact = useCallback(
    async (userId, normalizedUser) => {
      try {
        setLoading(true);
        const user = await updateUserContact(userId, normalizedUser);
        requestStatus(false, null, null, user);
        snack("success", "Updated contact successfully");
        return user;
      } catch (error) {
        requestStatus(false, error.message, null, user);
      }
    },
    [requestStatus, snack, user]
  );

  const handleUpdateUserKpoints = useCallback(
    async (userId, kpoints) => {
      try {
        await updateUserKpoints(userId, kpoints);
        snack("success", "Updated kPoints successfully");
      } catch (error) {
        snack("error", error.response.data);
      }
    },
    [snack]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      requestStatus(false, null, users, user);
      return users;
    } catch (error) {
      requestStatus(false, error.message, null, user);
    }
  }, [requestStatus, user]);

  const handleGetUsersDisplay = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getDisplayUsers();
      setLoading(false);
      setUsersDisplay(users);
      return users;
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, [requestStatus]);

  const handleGetUserDisplay = useCallback(
    async (userId) => {
      try {
        const userDisplay = await getDisplayUser(userId);
        return userDisplay;
      } catch (error) {
        snack("error", error.response.data);
      }
    },
    [snack]
  );

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        await deleteUser(userId);
        snack("success", "Deleted user successfully");
        handleGetUsers();
      } catch (error) {
        requestStatus(false, error.message, null, user);
      }
    },
    [handleGetUsers, requestStatus, snack, user]
  );

  const handleChangeBlock = useCallback(
    async (userId, isBlock) => {
      try {
        await changeUserBlock(userId, isBlock);
        snack("success", "Changed user block");
      } catch (error) {
        snack("error", error.response.data);
      }
    },
    [snack]
  );

  const handleFollowUser = useCallback(
    async (userId, isFollowed) => {
      try {
        await followUser(userId);
        if (!isFollowed) snack("success", "Follows User");
        if (isFollowed) snack("success", "Unfollows User");
      } catch (error) {
        snack("error", error.response.data);
      }
    },
    [snack]
  );

  const value = useMemo(() => {
    return {
      isLoading,
      error,
      users,
      curUser,
      filteredUsers,
      usersDisplay,
    };
  }, [isLoading, error, users, curUser, filteredUsers, usersDisplay]);

  return {
    value,
    user,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUser,
    handleUpdateUser,
    handleGetUsers,
    handleDeleteUser,
    handleViewUser,
    handleChangeBlock,
    handleUserInfo,
    handleUpdateUserContact,
    handleGetUserDisplay,
    handleUpdateUserKpoints,
    handleChangePass,
    handleFollowUser,
    handleGetUsersDisplay,
  };
};

export default useUsers;
