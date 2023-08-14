const Contact = require("./mongodb/Contact");
const { handleBadRequest } = require("../../utils/handleErrors");
const DB = process.env.DB || "MONGODB";

const getContacts = async () => {
  if (DB === "MONGODB") {
    try {
      let contacts = await Contact.find();
      return Promise.resolve(contacts);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const getContact = async (contactId) => {
  if (DB === "MONGODB") {
    try {
      let contact = await Contact.findById(contactId);
      return Promise.resolve(contact);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const setReadContact = async (contactId) => {
  if (DB === "MONGODB") {
    try {
      let contact = await Contact.findById(contactId);
      contact.read = true;
      contact = await contact.save();
      return Promise.resolve(contact);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const createContact = async (userContact, userId) => {
  if (DB === "MONGODB") {
    try {
      let contact = new Contact({ userId: userId, ...userContact });
      contact = await contact.save();
      return Promise.resolve(contact);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create post not in mongodb");
};

exports.getContacts = getContacts;
exports.setReadContact = setReadContact;
exports.createContact = createContact;
exports.getContact = getContact;
