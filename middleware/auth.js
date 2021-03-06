const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) res.status(401).json({ msg: "no token, auth denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "token is not vaild" });
  }
}

module.exports = auth;
