const express = require("express");
const SimpleNodeLoggerError = require("simple-node-logger");
const SQLQuery = require("../config/db");

const errorLog = SimpleNodeLoggerError.createSimpleLogger({
  logFilePath: "error.log",
  timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
});
const router = express.Router();
// const { errorHandler } = require("../config/mailgun");


module.exports = router;
