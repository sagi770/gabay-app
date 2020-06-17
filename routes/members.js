const express = require("express");
const jwt = require("jsonwebtoken");
const SimpleNodeLoggerError = require("simple-node-logger");
const SQLQuery = require("../config/db");

const errorLog = SimpleNodeLoggerError.createSimpleLogger({
  logFilePath: "error.log",
  timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
});
const router = express.Router();

router.post("/add", async (req, res) => {
  console.log("add member");
  const { name, email, phone } = req.body;

  const sqlFiled = [name];

  const sqlFiledPrepare = { name: "name", value: "?" };

  if (email) {
    sqlFiled.push(email);
    sqlFiledPrepare.name += ", email";
    sqlFiledPrepare.value += ",?";
  }
  if (phone) {
    sqlFiled.push(phone);
    sqlFiledPrepare.name += ", phone";
    sqlFiledPrepare.value += ",?";
  }

  try {
    const query = `INSERT INTO tbl_members (${sqlFiledPrepare.name}) VALUES  (${sqlFiledPrepare.value})`;
    const response = await SQLQuery(query, sqlFiled);

    console.log(response.insertId);

    return res.send({ id: response.insertId });
  } catch (err) {
    console.log(err);
    errorLog.info(` ${err.message} \n ${JSON.stringify(err)}`);
    res.status(500).json({ message: "Error in Customers" });
  }
});

router.put("/:id", async (req, res) => {
  console.log("add member");
  const { id } = req.params;

  const { name, email, phone } = req.body;

  try {
    const query = `UPDATE tbl_members 
                   SET name = ?,email = ?,phone = ?
                   WHERE id = ? LIMIT 1`;
    await SQLQuery(query, [name, email, phone, id]);
    return res.send("Successfully update member");
  } catch (err) {
    console.log(err);
    errorLog.info(` ${err.message} \n ${JSON.stringify(err)}`);
    res.status(500).json({ message: "Error in Customers" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM tbl_members 
                   WHERE id = ? LIMIT 1`;
    await SQLQuery(query, [id]);
    return res.send("Successfully delete member");
  } catch (err) {
    console.log(err);
    errorLog.info(` ${err.message} \n ${JSON.stringify(err)}`);
    res.status(500).json({ message: "Error in Customers" });
  }
});

router.get("/:id", async (req, res) => {
  console.log("members by id");
  const { id } = req.params;

  try {
    const query = `
      SELECT id, name, email, phone
      FROM   tbl_members 
      WHERE id = ?
      ORDER BY id DESC`;
    const rows = await SQLQuery(query, [id]);

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    errorLog.info(` ${err.message} \n ${JSON.stringify(err)}`);
    res.status(500).json({ message: "Error in Customers" });
  }
});

router.get("/", async (req, res) => {
  console.log("members");
  const { token } = req.headers;
  const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
  try {
    const query = `
      SELECT id, first_name, last_name, email, phone
      FROM   tbl_members 
      WHERE user_id = ?
      ORDER BY id DESC`;
    const rows = await SQLQuery(query, [_id]);

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    errorLog.info(` ${err.message} \n ${JSON.stringify(err)}`);
    res.status(500).json({ message: "Error in Customers" });
  }
});

module.exports = router;
