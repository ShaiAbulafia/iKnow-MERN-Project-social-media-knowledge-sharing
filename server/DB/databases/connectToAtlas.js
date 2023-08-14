const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@iknow-db.mgzogeg.mongodb.net/iKnowDB?retryWrites=true&w=majority`
  )
  .then(() => console.log(chalk.magentaBright("connected to MongoDB Atlas!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDB: ${error}`))
  );
