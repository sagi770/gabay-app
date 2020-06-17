const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
const Auth = (req, res, next) => {
  console.log("Auth call");
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: "missing token!" });
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user_email = email;

    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
module.exports = Auth;
