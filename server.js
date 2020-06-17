const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const Auth = require("./middleware/auth");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/login", require("./routes/user"));

app.use("/api/utils", Auth, require("./routes/utils"));

app.get("/api/auth", Auth, function(req, res) {
  res.status(200).send("OK");
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.API_PORT, () => {
  console.log(`listening on port ${process.env.API_PORT}!`);
});
