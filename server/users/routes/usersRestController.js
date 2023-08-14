const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { generateUserPassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserBlock,
  getViewUser,
  getUserAddress,
  updateUserContact,
  getUserDisplay,
  changeUserKpoints,
  updateUserPass,
  followUser,
  getUsersDisplay,
} = require("../models/usersAccessDataService");

const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
  validateContact,
  validateResetPass,
} = require("../validations/userValidationService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);
    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateLogin(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/usersDisplay", async (req, res) => {
  try {
    const users = await getUsersDisplay();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/usersDisplay/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDisplay = await getUserDisplay(id);
    return res.send(userDisplay);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getViewUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/address/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );
    const address = await getUserAddress(id);
    return res.send(address);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/address/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let user = req.body;

    const { error } = validateContact(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = await updateUserContact(id, user);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/resetPassword", async (req, res) => {
  try {
    let userInfo = req.body;
    const { error } = validateResetPass(userInfo);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    userInfo.password = generateUserPassword(userInfo.password);
    let user = await updateUserPass(userInfo);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/kPoints/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let { kPoints } = req.body;
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user can change users k-Points"
      );
    let updatedUser = await changeUserKpoints(id, kPoints);
    return res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let user = req.body;

    const { error } = validateUserUpdate(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);
    user = await updateUser(id, user);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { isBlock } = req.body;
    const { id } = req.params;
    const user = req.user;

    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to change user status"
      );
    const newUser = await changeUserBlock(id, isBlock);
    return res.send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/follow/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const newUser = await followUser(id, user._id);
    return res.send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to delete user"
      );
    const deletedUser = await deleteUser(id);
    return res.send(deletedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
