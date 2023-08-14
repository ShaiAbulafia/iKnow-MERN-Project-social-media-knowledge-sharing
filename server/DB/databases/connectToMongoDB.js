const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://localhost:27017/iKnow-DB")
  .then(() => console.log(chalk.magentaBright("connected to MongoDB!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDB: ${error}`))
  );
