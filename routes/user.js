const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SQLQuery = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.email) {
    return res.status(404).json({ error: "missing info!" });
  }
  console.log("login");
  try {
    const query = `
      SELECT id, email, name, password
      FROM   tbl_users 
      WHERE  email = ?`;
    const [user] = await SQLQuery(query, [req.body.email.toLowerCase()]);

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user.id,
          email: user.email,
          name: user.name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "4h",
        });
        res.status(200).send({ token });
      } else {
        res.status(403).json({ error: "Incorrect email or password" });
      }
    } else {
      res.status(403).json({ error: "Incorrect email or password" });
    }
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({ message: "Error on login" });
  }
});

module.exports = router;
