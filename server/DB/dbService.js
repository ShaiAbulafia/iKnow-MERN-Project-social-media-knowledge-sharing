require("dotenv").config();
const ENVIRONMENT = process.env.NODE_ENV;
const connectToDB = () => {
  if (ENVIRONMENT === "development") require("./databases/connectToMongoDB");
  if (ENVIRONMENT === "production") require("./databases/connectToAtlas");
};

module.exports = connectToDB;
