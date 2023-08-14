const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  getContacts,
  getContact,
  setReadContact,
  createContact,
} = require("../models/contactAccessDataService");
const validateContact = require("../validations/contactValidationService");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const contacts = await getContacts();
    return res.send(contacts);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const contacts = await getContact(id);
    return res.send(contacts);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    const { id } = req.params;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const contact = await setReadContact(id);
    return res.send(contact);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let contact = req.body;
    const user = req.user;
    const { error } = validateContact(contact);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    contact = await createContact(contact, user._id);
    return res.status(201).send(contact);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
